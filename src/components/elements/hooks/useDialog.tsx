import React from "react";
import ReactDOM from "react-dom";

import IDialog from "../Dialog";

export const useDialog = () => {
  const modalRoot = document.querySelector("#modal-root");

  return (options: {
    title: string;
    message: string;
    onAccept: () => void;
    onDecline: () => void;
  }) => {
    const container = document.createElement("div");
    modalRoot?.appendChild(container);

    ReactDOM.render(
      <IDialog
        title={options.title}
        message={options.message}
        onAccept={() => {
          options.onAccept();
          ReactDOM.unmountComponentAtNode(container);
          modalRoot?.removeChild(container);
        }}
        onDecline={() => {
          options.onDecline();
          ReactDOM.unmountComponentAtNode(container);
          modalRoot?.removeChild(container);
        }}
      />,
      container
    );
  };
};
