declare module "json-schema-faker" {
  export interface JsfOptions {
    /**
     * If `failOnInvalidTypes` is disabled this value will be returned on any invalid type given
     * @default null
     */
    defaultInvalidTypeProduct: any;

    /**
     * Setup default value directly as `RandExp.prototype.max`
     * @default 10
     */
    defaultRandExpMax: number;

    /**
     * Skip given properties from being generated
     * @default []
     */
    ignoreProperties: string[];

    /**
     * If enabled, it will resolve to `{}` for unknown references
     * @default false
     */
    ignoreMissingRefs: boolean;

    /**
     * If enabled, it will throw an `Error` for unknown types
     * @default true
     */
    failOnInvalidTypes: boolean;

    /**
     * If enabled, it will throw an `Error` for unknown formats
     * @default true
     */
    failOnInvalidFormat: boolean;

    /**
     * When enabled, it will set optionalsProbability: `1.0` and fixedProbabilities: `true`
     * @default false
     */
    alwaysFakeOptionals: boolean;

    /**
     * A value from `0.0` to `1.0` to generate values in a consistent way,
     * e.g. `0.5` will generate from 0% to 50% of values.
     * Using arrays it means items, on objects they're properties, etc.
     * @default false
     */
    optionalsProbability: boolean;

    /**
     * If enabled, then `optionalsProbability: 0.5` will always generate the half of values
     * @default false
     */
    fixedProbabilities: boolean;

    /**
     * If enabled, it will return a random value from examples if they're present
     * @default false
     */
    useExamplesValue: boolean;

    /**
     * If enabled, it will return the default value if present
     * @default false
     */
    useDefaultValue: boolean;

    /**
     * If enabled, only required properties will be generated
     * @default false
     */
    requiredOnly: boolean;

    /**
     * Override `minItems` if it's less than this value
     * @default 0
     */
    minItems: number;

    /**
     * Override `maxItems` if it's greater than this value
     * @default null
     */
    maxItems: number;

    /**
     * Override `minLength` if it's less than this value
     * @default 0
     */
    minLength: number;

    /**
     * Override `maxLength` if it's greater than this value
     * @default null
     */
    maxLength: number;

    /**
     * Set a minimum circular `$ref` depth to render
     * @default 0
     */
    refDepthMin: number;

    /**
     * Set a maximum circular `$ref` depth to render
     * @default 3
     */
    refDepthMax: number;

    /**
     * If enabled, it will expand `jsonPath` keywords on all generated objects
     * @default false
     */
    resolveJsonPath: boolean;

    /**
     * If enabled, it will try to generate missing properties from existing ones. Only when `fillProperties` is enabled too
     * @default false
     */
    reuseProperties: boolean;

    /**
     * If enabled, it will try to generate missing properties to fulfill the schema definition
     * @default true
     */
    fillProperties: boolean;

    /**
     * Setup a custom randonmess generator, useful for getting deterministic results
     * @default Math.random
     */
    random: any;

    /**
     * Replace default empty value by a random value
     * @default false
     */
    replaceEmptyByRandomValue: boolean;
  }

  export interface Jsf {
    generate: (schema: any, refs?: any[]) => any;

    resolve: (schema: any, refs?: any[], cwd?: string) => Promise<any>;

    format: (name: string, callback: () => any) => void;

    format: (name: string, _: null) => void;

    option: (optionName: keyof JsfOptions, value: any) => void;

    option: (options: Partial<JsfOptions>) => void;

    version: string;

    random: any;

    extend: (prop: string, generator: () => any) => void;

    define: (
      prop: string,
      generator: (value: any, schema: object) => any
    ) => void;

    reset: (prop: string) => void;

    reset: () => void;

    locate: (prop: string) => any;
  }

  const jsf: Jsf;

  export default jsf;
}
