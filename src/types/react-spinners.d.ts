// Shim de tipos para 'react-spinners' — evita erro quando não há @types publicado
declare module 'react-spinners' {
    import * as React from 'react';

    export interface LoaderProps {
        loading?: boolean;
        size?: number | string;
        color?: string;
        className?: string;
        style?: React.CSSProperties;
        // aceita quaisquer outras props
        [key: string]: any;
    }

    export const ClipLoader: React.FC<LoaderProps>;
    export const BeatLoader: React.FC<LoaderProps>;
    export default ClipLoader;
}
