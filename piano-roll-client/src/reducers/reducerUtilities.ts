import { Action, ActionCreator, Reducer } from "redux";

interface ActionCreatorTypeMetadata<TType extends string> {
  getType?: () => TType;
}

function checkValidActionCreator(
  arg: unknown
): arg is ActionCreator<string> {
  return typeof arg === "function" && "getType" in arg;
}

function checkInvalidActionCreator(arg: unknown) {
  return !checkValidActionCreator(arg);
}

function throwInvalidActionCreator(argPosition: number): never {
  throw new Error(
    `Argument ${argPosition} is invalid, it should be an action-creator instance from "typesafe-actions"`
  );
}

function checkValidActionType(arg: unknown): arg is string | symbol {
  return typeof arg === "string" || typeof arg === "symbol";
}

function throwInvalidActionTypeOrActionCreator(
  argPosition: number
): never {
  throw new Error(
    `Argument ${argPosition} is invalid, it should be an action-creator instance from "typesafe-actions" or action type of type: string | symbol`
  );
}

function checkIsEmpty(arg: unknown) {
  return arg == null;
}

function throwIsEmpty(argPosition: number): never {
  throw new Error(`Argument ${argPosition} is empty.`);
}


function getType<TType extends string>(
  actionCreator: ActionCreator<TType> & ActionCreatorTypeMetadata<TType>
): TType {
  if (checkIsEmpty(actionCreator)) {
    throwIsEmpty(1);
  }

  if (checkInvalidActionCreator(actionCreator)) {
    throwInvalidActionCreator(1);
  }

  return actionCreator.getType!();
}

type HandleActionChainApi<TState,
  TInputAction extends Action,
  TRootAction extends Action> = <TActionCreator extends (...args: any[]) => TInputAction,
  THandledAction extends ReturnType<TActionCreator>,
  TOutputAction extends Exclude<TInputAction, THandledAction>>(
  singleOrMultipleCreatorsAndTypes: TActionCreator | TActionCreator[],
  reducer: (state: TState, action: THandledAction) => TState
) => [TOutputAction] extends [Action]
  ? Reducer<TState, TRootAction> & {
  handlers: Record<Exclude<TRootAction, TOutputAction>["type"],
    (state: TState, action: TRootAction) => TState>;
  handleAction: HandleActionChainApi<TState, TOutputAction, TRootAction>;
}
  : Reducer<TState, TRootAction> & {
  handlers: Record<TRootAction["type"],
    (state: TState, action: TRootAction) => TState>;
};

type HandleTypeChainApi<TState,
  TInputAction extends Action,
  TRootAction extends Action> = <TType extends TInputAction["type"],
  THandledAction extends Extract<TInputAction, Action<TType>>,
  TOutputAction extends Exclude<TInputAction, THandledAction>>(
  singleOrMultipleCreatorsAndTypes: TType | TType[],
  reducer: (state: TState, action: THandledAction) => TState
) => [TOutputAction] extends [Action]
  ? Reducer<TState, TRootAction> & {
  handlers: Record<Exclude<TRootAction, TOutputAction>["type"],
    (state: TState, action: TRootAction) => TState>;
  handleType: HandleTypeChainApi<TState, TOutputAction, TRootAction>;
}
  : Reducer<TState, TRootAction> & {
  handlers: Record<TRootAction["type"],
    (state: TState, action: TRootAction) => TState>;
};

type GetAction<TAction extends Action,
  TType extends TAction["type"]> = TAction extends Action<TType> ? TAction : never;

type InitialHandler<TState, TRootAction extends Action> = {
  [P in TRootAction["type"]]?: (
    state: TState,
    action: GetAction<TRootAction, P>
  ) => TState;
};

interface Types {
}

type RootAction = Types extends { RootAction: infer T } ? T : any;

export function createReducer<TState, TRootAction extends Action = RootAction>(
  initialState: TState,
  initialHandlers: InitialHandler<TState, TRootAction> = {} as InitialHandler<TState, TRootAction>
) {
  const handlers: any = {
    ...initialHandlers,
  };

  const rootReducer: Reducer<TState, TRootAction> = (
    state = initialState,
    action: TRootAction
  ) => {
    if (handlers.hasOwnProperty(action.type)) {
      const reducer = handlers[action.type];
      if (typeof reducer !== "function") {
        throw Error(
          `Reducer under "${action.type}" key is not a valid reducer`
        );
      }
      return reducer(state, action);
    } else {
      return state;
    }
  };

  const reducerHandler = ((
    singleOrMultipleCreatorsAndTypes: any,
    reducer: any
  ) => {
    const creatorsAndTypes = Array.isArray(singleOrMultipleCreatorsAndTypes)
      ? singleOrMultipleCreatorsAndTypes
      : [singleOrMultipleCreatorsAndTypes];

    const newHandlers: typeof handlers = {};

    creatorsAndTypes
      .map(
        (
          acOrType: TRootAction["type"] | ((...args: any[]) => TRootAction),
          index
        ) =>
          checkValidActionCreator(acOrType)
            ? getType(acOrType)
            : checkValidActionType(acOrType)
            ? acOrType
            : throwInvalidActionTypeOrActionCreator(index + 1)
      )
      .forEach(type => (newHandlers[type] = reducer));

    return createReducer<TState, TRootAction>(initialState, {
      ...handlers,
      ...newHandlers,
    });
  }) as
    | HandleActionChainApi<TState, TRootAction, TRootAction>
    | HandleTypeChainApi<TState, TRootAction, TRootAction>;

  return Object.assign(rootReducer, {
    handlers: { ...handlers },
    handleAction: reducerHandler,
    handleType: reducerHandler,
  }) as Reducer<TState, TRootAction> &
    Readonly<{
      handlers: InitialHandler<TState, RootAction>;
      handleAction: [unknown] extends [TRootAction]
        ? any
        : HandleActionChainApi<TState, TRootAction, TRootAction>;
      handleType: [unknown] extends [TRootAction]
        ? any
        : HandleTypeChainApi<TState, TRootAction, TRootAction>;
    }>;
}
