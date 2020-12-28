import createPersistedState from "use-persisted-state";

const useModel = createPersistedState("model");
const useThreshold = createPersistedState("threshold");
const useDebug = createPersistedState("debug");
const DEFAULT_MODEL = "DEFAULT";
export { useModel, useThreshold, useDebug, DEFAULT_MODEL };
