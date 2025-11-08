declare module '@phosphor-icons/react' {
    import * as React from 'react';

    interface IconProps {
        size?: number | string;
        color?: string;
        weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
        alt?: string;
        className?: string;
    }

    export const FacebookLogoIcon: React.FC<IconProps>;
    export const InstagramLogoIcon: React.FC<IconProps>;
    export const LinkedinLogoIcon: React.FC<IconProps>;
    // Adicione outros ícones conforme necessário
}