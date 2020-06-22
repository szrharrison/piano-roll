import React, { FunctionComponent, useCallback } from "react";
import classNames from "classnames";

import { Key, wideKeys } from "../concerns/keyboard";
import Player from "../api/ToneKeyboardHandler";

export type Props = {
  white: boolean
  name: Key
}

const PianoKey: FunctionComponent<Props> = props => {
  const { name, white } = props;
  const handleClick = useCallback(() => {
    Player.triggerKey(name);
  }, []);
  return <li
    className={classNames({
      "black-tut": !white,
      "wide": wideKeys.find(key => name.search(key) !== -1)
    })}
    onClick={handleClick}
  >
      <span className="tut">
        <div>
          <i>
            {name}
          </i>
        </div>
      </span>
  </li>;
};

export default React.memo(PianoKey);
