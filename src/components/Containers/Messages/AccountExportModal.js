import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import AnimatedModal from '../../Components/Animated/AnimatedModal';
import {
  colorPrimary,
  colorBlackLight,
  colorBadgeRed,
  boxShadow
} from '../../../styles/styleVariables';

// Axios
import Axios from '../../../services/axiosConfig';
import { RECORDS_REQUEST } from '../../../services/requests';

// Deps
import { saveAs } from 'file-saver';
import { useAlert } from 'react-alert';
import { motion, AnimatePresence } from 'framer-motion';

// Context
import { AccountContext } from './MessagesMain';

// Children
import Button from '../../Components/Buttons/Button';
import Spinner from '../../Components/Loading/Spinner';
import { RECORDS_REQUEST_QUERY } from '../../../constants/localStorageConstants';
import { getValueFromLocalStorage } from '../../../localStorageUtils/localStorageManager';
import useKeyPress from '../../Hooks/useKeyPress';

const AccountExportModal = ({ closeModal, isVisible }) => {
  const alert = useAlert();
  const { messagesTotalCount, facets } = useContext(AccountContext);
  const [exporting, setExporting] = useState(false);
  const [processedCount, setProcessedCount] = useState('');
  const [unprocessedCount, setUnprocessedCount] = useState('');
  const [restrictedCount, setRestrictedCount] = useState('');
  const [redactedCount, setRedactedCount] = useState('');
  const [nonrecordCount, setNonrecordCount] = useState('');

  useKeyPress('Escape', closeModal);

  useEffect(() => {
    const {
      _filter_processed,
      _filter_is_restricted,
      _filter_needs_redaction,
      _filter_is_record
    } = facets;
    const processedBucket = _filter_processed.processed.buckets.find(
      b => b.key_as_string === 'true'
    );

    const unprocessedBucket = _filter_processed.processed.buckets.find(
      x => x.key_as_string === 'false'
    );
    const restrictedBucket = _filter_is_restricted.is_restricted.buckets.find(
      b => b.key_as_string === 'true'
    );
    const redactedBucket = _filter_needs_redaction.needs_redaction.buckets.find(
      b => b.key_as_string === 'true'
    );
    const nonrecordBucket = _filter_is_record.is_record.buckets.find(
      b => b.key_as_string === 'false'
    );

    if (processedBucket) setProcessedCount(processedBucket.doc_count);
    else setProcessedCount('');
    if (unprocessedBucket) setUnprocessedCount(unprocessedBucket.doc_count);
    else setUnprocessedCount('');
    if (restrictedBucket) setRestrictedCount(restrictedBucket.doc_count);
    else setRestrictedCount('');
    if (redactedBucket) setRedactedCount(redactedBucket.doc_count);
    else setRedactedCount('');
    if (nonrecordBucket) setNonrecordCount(nonrecordBucket.doc_count);
    else setNonrecordCount('');
  }, [facets]);

  const handleExport = () => {
    const rrQuery = getValueFromLocalStorage(RECORDS_REQUEST_QUERY);
    if (!rrQuery) {
      return alert.error('Some information is missing. Please reapply your search and try again.');
    }

    const splitQuery = rrQuery.split('&');
    if (!splitQuery[1]) {
      // it's JUST account=\d, maybe a mistake? This will export the entire account...
      // TODO warning? Get Confirmation?
    }

    setExporting(true);
    Axios.get(RECORDS_REQUEST + rrQuery, { responseType: 'blob', timeout: 10000 })
      .then(response => {
        const filename = response.headers['content-disposition']
          .split(';')
          .find(n => n.includes('filename='))
          .replace('filename=', '')
          .trim();
        const blob = new Blob([response.data], {
          type: 'text/plain'
        });
        saveAs(blob, filename);
        setExporting(false);
        closeModal();
      })
      .catch(error => {
        console.warn('Error exporting messages: ', error);
        alert.error('Export failed');
        setExporting(false);
      });
  };

  return (
    <AccountExportModalStyled closeModal={exporting ? undefined : closeModal} isVisible={isVisible}>
      <AnimatePresence exitBeforeEnter initial={false}>
        {exporting ? (
          <LoadingContent
            key="loadingContent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.25,
              ease: 'linear'
            }}
          >
            <h4>Processesing Export...</h4>
            <Spinner large immediate />
          </LoadingContent>
        ) : (
          <ExportContent
            key="exportContent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.25,
              ease: 'linear'
            }}
          >
            <Warning>
              Export <span>{messagesTotalCount}</span> messages?
            </Warning>
            <ExportDetails>
              {processedCount && processedCount >= 0 && (
                <DetailItem>
                  <span>{processedCount}</span> Processed
                </DetailItem>
              )}
              {nonrecordCount && nonrecordCount >= 0 && (
                <DetailItem>
                  <span>{nonrecordCount}</span> Non-record
                </DetailItem>
              )}
              {unprocessedCount && unprocessedCount >= 0 && (
                <DetailItem caution>
                  <span>{unprocessedCount}</span> Unprocessed
                </DetailItem>
              )}
              {redactedCount && redactedCount >= 0 && (
                <DetailItem caution>
                  <span>{redactedCount}</span> {redactedCount === 1 ? 'Needs' : 'Need'} Redaction
                </DetailItem>
              )}
              {restrictedCount && restrictedCount >= 0 && (
                <DetailItem caution>
                  <span>{restrictedCount}</span> Restricted
                </DetailItem>
              )}
            </ExportDetails>
            <Actions>
              <Button neutral onClick={closeModal}>
                Cancel
              </Button>
              <Button data-cy="export-button" positive onClick={handleExport}>
                Export
              </Button>
            </Actions>
          </ExportContent>
        )}
      </AnimatePresence>
    </AccountExportModalStyled>
  );
};

const ExportContent = styled(motion.div)`
  height: auto;
  width: auto;
  padding: 4rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadingContent = styled(motion.div)`
  height: auto;
  width: auto;
  padding: 4rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Warning = styled.h2`
  span {
    color: ${colorPrimary};
  }
`;

const ExportDetails = styled.div`
  margin-bottom: 4rem;
`;

const DetailItem = styled.p`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${props => (props.caution ? colorBadgeRed : colorBlackLight)};
`;

const Actions = styled.div`
  width: 100%;
  min-width: 25rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AccountExportModalStyled = styled(AnimatedModal)`
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: auto;
  width: auto;
  box-shadow: ${boxShadow};
`;

export default AccountExportModal;
