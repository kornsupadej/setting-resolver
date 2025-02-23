export namespace ESLint {
  export type LegacyConfig = import("eslint").Linter.BaseConfig;
  export type FlatConfig = import("eslint").Linter.Config;
  export type LegacyConfigArray = import("eslint").Linter.BaseConfig[];
  export type FlatConfigArray = import("eslint").Linter.Config[];
}
export type SettingSpec = {
  /**
   * Retrieve eslint config format
   * (eslint version > 9.x must use legacy)
   * @description legacy backward compatibility in future version
   * @default flat
   */
  format: "flat" | "legacy";
  /**
   * Identify rootDir to improve performance
   * in case that some of the setting required specific file
   * to be searched or loaded
   * @default process.cwd()
   */
  rootDir?: string | URL;
  /**
   * Enable setting up additional config
   * for typescript project
   * @default false
   */
  typescript?: boolean;
  /**
   * Integrate prettier with eslint to
   * resolve conflicting rules if the project
   * is using prettier as a code formatter
   * @default false
   */
  prettier?: boolean;
};
export type SettingTypes = "nodejs" | "prettier" | "jest" | "vitest";
export type SettingOption = {
  type: SettingTypes;
  options?: ESLint.LegacyConfig | ESLint.FlatConfig;
};
export declare function resolveSetting(
  settingSpec: SettingSpec,
  ...settingOptions: SettingOption[] | SettingTypes[]
): ESLint.FlatConfigArray | ESLint.LegacyConfigArray;
