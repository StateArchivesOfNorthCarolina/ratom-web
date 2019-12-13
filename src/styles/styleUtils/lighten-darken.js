import tinycolor from 'tinycolor2';
import { standardLighten, standardDarken } from '../styleVariables';

export const lighten = (color, percent) => tinycolor(color)
    .lighten(percent || standardLighten)
    .toString()

export const darken = (color, percent) => tinycolor(color)
    .darken(percent || standardDarken)
    .toString();