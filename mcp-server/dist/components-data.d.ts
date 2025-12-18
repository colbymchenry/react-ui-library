/**
 * Component documentation data for the Volcanica React UI Library
 *
 * This structured data allows AI assistants to query specific component
 * information on-demand without loading the entire documentation.
 */
export interface ComponentProp {
    name: string;
    type: string;
    required: boolean;
    default?: string;
    description: string;
}
export interface ComponentExample {
    title: string;
    description: string;
    code: string;
}
export interface ComponentDoc {
    name: string;
    importName: string;
    category: 'form' | 'layout' | 'ui' | 'feedback' | 'navigation';
    description: string;
    props: ComponentProp[];
    examples: ComponentExample[];
    bestPractices: string[];
    relatedComponents: string[];
}
/**
 * Complete documentation for all UI library components
 */
export declare const componentsData: ComponentDoc[];
/**
 * Get library metadata and setup information
 */
export declare const libraryInfo: {
    name: string;
    package: string;
    version: string;
    installation: string;
    stylesImport: string;
    peerDependencies: string[];
    tailwindConfig: string;
    materialIconsSetup: string;
    themeVariables: string[];
};
