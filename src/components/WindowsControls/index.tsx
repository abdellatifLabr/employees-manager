import { useCallback, useState } from "react";
import * as React from "react";

interface Props {
  dark?: boolean;
  onClose?: () => void;
  onMaximize?: () => void;
  onMinimize?: () => void;
  onMouseUp?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
  style?: any;
  isMaximized?: boolean;
}

export const WindowsControls = ({
  dark,
  onClose,
  onMaximize,
  onMinimize,
  onMouseUp,
  style,
  isMaximized = false,
}: Props) => {
  const [_isMaximized, _setIsMaximized] = useState(isMaximized);

  const _onClose = useCallback(() => {
    if (onClose) onClose();
    window.Main.sendMessage("close");
  }, [onClose]);

  const _onMaximize = useCallback(() => {
    if (!_isMaximized) {
      if (onMaximize) onMaximize();
      window.Main.sendMessage("maximize");
      _setIsMaximized(true);
    } else {
      window.Main.sendMessage("unmaximize");
      _setIsMaximized(false);
    }
  }, [_isMaximized, onMaximize]);

  const _onMinimize = useCallback(() => {
    if (onMinimize) onMinimize();
    window.Main.sendMessage("minimize");
  }, [onMinimize]);

  return (
    <div
      onMouseUp={onMouseUp}
      style={{ display: "flex", height: "30px", ...style }}
    >
      <WindowsControl minimize whiteIcon={dark} onClick={_onMinimize} />
      <WindowsControl
        maximize={!_isMaximized}
        restore={_isMaximized}
        whiteIcon={dark}
        onClick={_onMaximize}
      />
      <WindowsControl close whiteIcon={dark} onClick={_onClose} />
    </div>
  );
};

import closeIcon from "/assets/close.svg";
import maximizeIcon from "/assets/maximize.svg";
import minimizeIcon from "/assets/minimize.svg";
import restoreIcon from "/assets/restore.svg";

interface Props {
  maximize?: boolean;
  close?: boolean;
  minimize?: boolean;
  restore?: boolean;
  whiteIcon?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
  style?: any;
  disabled?: boolean;
}

interface State {
  hover?: boolean;
}

class WindowsControl extends React.PureComponent<Props, State> {
  state = {
    hover: false,
  };

  onMouseEnter = () => {
    this.setState({ hover: true });
  };

  onMouseLeave = () => {
    this.setState({ hover: false });
  };

  public render() {
    const { hover } = this.state;
    const {
      close,
      maximize,
      minimize,
      restore,
      whiteIcon,
      onClick,
      style,
      disabled,
    } = this.props;

    let icon: string = "";

    if (close) icon = closeIcon;
    else if (minimize) icon = minimizeIcon;

    if (maximize == true) {
      icon = maximizeIcon;
    }
    if (restore == true) {
      icon = restoreIcon;
    }

    return (
      <div
        onClick={onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        style={{
          height: "100%",
          width: 45,
          minWidth: 45,
          position: "relative",
          transition: "0.2s background-color",
          backgroundColor: hover
            ? !close
              ? "rgba(196, 196, 196, 0.4)"
              : "#e81123"
            : "transparent",
          pointerEvents: disabled ? "none" : "auto",
          ...style,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            transition: "0.2s filter",
            filter: whiteIcon || (close && hover) ? "invert(100%)" : "none",
            backgroundPosition: "center",
            backgroundSize: "11px",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${icon})`,
            opacity: disabled ? 0.54 : 1,
          }}
        />
      </div>
    );
  }
}
