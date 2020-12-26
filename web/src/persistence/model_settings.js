import createPersistedState from "use-persisted-state";

const useModel = createPersistedState("model");
const useThreshold = createPersistedState("threshold");
const DEFAULT_MODEL = "DEFAULT";
export { useModel, useThreshold, DEFAULT_MODEL };
