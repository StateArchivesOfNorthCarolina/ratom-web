export const emailQuery = ({ emailId }) => {
    return `
        query {
            email(id: ${emailId}) {
                subject
                content
            }
        }
    `
}