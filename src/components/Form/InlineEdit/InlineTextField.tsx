/** @jsxImportSource @emotion/react */
import React, { useCallback, useRef, useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import Buttons from "./Buttons";
import useButtonFocusHook from "./use-button-focus-hook";
import ReadView from "./ReadView";
import { TextField } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";

const inputStyles = css({
  maxWidth: "100%",
  position: "relative",
});

const buttonStyles = css({
  display: "none",
});

interface InlineEditProps {
  /** Sets whether the component shows the `readView` or the `editView`. This is used to manage the state of the input in stateless inline edit. */
  isEditing?: boolean;
  startWithEditViewOpen?: boolean;
  /**
   Saves and confirms the value entered into the field. It exits `editView` and returns to `readView`.
   */
  onConfirm: (value: any) => void;
  /** Handler called when readView is clicked. */
  onEdit?: () => void;
  /**
   * Sets the view when the element blurs and loses focus (this can happen when a user clicks away).
   * When set to true, inline edit stays in `editView` when blurred. */
  keepEditViewOpenOnBlur?: boolean;
  /** Sets whether confirm and cancel action buttons are displayed in the bottom right of the field. */
  hideActionButtons?: boolean;
  /** Determines whether the input value can be confirmed as empty. */
  isRequired?: boolean;
  /** Exits `editView` and switches back to `readView`. This is called when the cancel action button (x) is clicked. */
  onCancel?: () => void;
  /** The user input entered into the field during `editView`. This value is updated and saved by `onConfirm`. */
  defaultValue: any;
  /** Label above the input field that communicates what value should be entered. */
  label?: string;
  /** Determines whether the `readView` has 100% width within its container, or whether it fits the content. */
  readViewFitContainerWidth?: boolean;
}

const noop = (): void => {};

export default function InlineTextField(props: InlineEditProps): JSX.Element {
  const {
    startWithEditViewOpen = false,
    keepEditViewOpenOnBlur = false,
    hideActionButtons = false,
    isRequired = false,
    readViewFitContainerWidth = false,
    defaultValue,
    isEditing,
    label,
    onConfirm: providedOnConfirm,
    onCancel: providedOnCancel = noop,
    onEdit: providedOnEdit = noop,
  } = props;
  const editButtonLabel: string = "Edit";
  const confirmButtonLabel: string = "Confirm";
  const cancelButtonLabel: string = "Cancel";

  const wasFocusReceivedSinceLastBlurRef = useRef(false);
  const isControlled = typeof isEditing === "undefined";
  const [isEditingState, setEditingState] = useState(startWithEditViewOpen);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  let formRef: React.RefObject<HTMLFormElement> = useRef(null);

  const {
    editButtonRef,
    editViewRef,
    shouldBeEditing,
    doNotFocusOnEditButton,
  } = useButtonFocusHook(isEditing, isEditingState);

  const onCancel = useCallback(() => {
    if (isControlled) {
      setEditingState(false);
    }
    providedOnCancel();
  }, [isControlled, providedOnCancel]);

  const onEditRequested = useCallback(() => {
    if (isControlled) {
      setEditingState(true);
    }
    providedOnEdit();
    if (shouldBeEditing && editViewRef.current) {
      editViewRef.current.focus();
    }
  }, [isControlled, shouldBeEditing, editViewRef, providedOnEdit]);

  const onConfirm = (value: string): void => {
    providedOnConfirm(value);
    console.log(value);
    if (isControlled) {
      setEditingState(false);
    }
  };

  const onCancelClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      onCancel();
    },
    [onCancel]
  );

  const tryAutoSubmitWhenBlur = useCallback(
    (
      isFieldInvalid: boolean,
      onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void,
      formRef: React.RefObject<HTMLFormElement>
    ): void => {
      if (
        !isFieldInvalid &&
        !wasFocusReceivedSinceLastBlurRef.current &&
        formRef.current
      ) {
        doNotFocusOnEditButton();
        console.log(formRef.current);
        if (formRef.current.checkValidity()) {
          console.log("valid");
          onSubmit();
        }
      }
    },
    [doNotFocusOnEditButton]
  );

  /** If keepEditViewOpenOnBlur prop is set to false, will call confirmIfUnfocused() which
   *  confirms the value, if the focus is not transferred to the action buttons
   *
   *  When you're in `editing` state, the focus will be on the input field. And if you use keyboard
   *  to navigate to `submit` button, this function will be invoked. Then function `onEditViewWrapperFocus`
   *  will be called, the timeout used here is making sure `onEditViewWrapperFocus` is always called before
   *  `autoSubmitWhenBlur`.
   *
   *  There are two paths here the function can be triggered:
   *
   *  - focus on input first, and then use keyboard to `submit`
   *  - focus on input first, and then click anywhere else on the page (outside of edit view wrapper) to `submit` (auto save)
   */
  const onEditViewWrapperBlur = useCallback(
    (
      isFieldInvalid: boolean,
      onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void,
      formRef: React.RefObject<HTMLFormElement>
    ): void => {
      if (!keepEditViewOpenOnBlur) {
        wasFocusReceivedSinceLastBlurRef.current = false;
        timerRef.current = setTimeout(
          () => tryAutoSubmitWhenBlur(isFieldInvalid, onSubmit, formRef),
          0
        );
      }
    },
    [keepEditViewOpenOnBlur, tryAutoSubmitWhenBlur]
  );

  /** Gets called when focus is transferred to the editView, or action buttons
   *
   * There are three paths here the function can be called:
   *
   * - when a user click the `editView`
   * - when a user use keyboard to tab into `editView`
   * - when a user use keyboard to tab into `submit` when they were on input field
   */
  const onEditViewWrapperFocus = useCallback(() => {
    wasFocusReceivedSinceLastBlurRef.current = true;
  }, []);

  const renderReadView = (): React.ReactNode => (
    <ReadView
      editButtonLabel={editButtonLabel}
      onEditRequested={onEditRequested}
      postReadViewClick={doNotFocusOnEditButton}
      editButtonRef={editButtonRef}
      readViewFitContainerWidth={readViewFitContainerWidth}
      editValue={defaultValue}
    />
  );

  return (
    <Formik
      onSubmit={(data: { inlineEdit: string }): void => {
        onConfirm(data.inlineEdit);
      }}
      initialValues={{ inlineEdit: defaultValue }}>
      {({
        touched,
        errors,
        handleSubmit,
        handleChange,
      }: FormikProps<any>): React.ReactNode => (
        <Form
          ref={(p): void => {
            formRef.current = p;
          }}>
          {shouldBeEditing ? (
            <div css={inputStyles}>
              <TextField
                autoFocus
                defaultValue={defaultValue}
                required={isRequired}
                onBlur={(): void => {
                  onEditViewWrapperBlur(
                    errors.inlineEdit !== undefined,
                    handleSubmit,
                    formRef
                  );
                }}
                name="inlineEdit"
                onChange={handleChange}
                onFocus={onEditViewWrapperFocus}
                key="edit-view" // used for reset to default value
                helperText={
                  errors.inlineEdit && touched.inlineEdit && errors.inlineEdit
                }
                fullWidth
              />
              {!hideActionButtons ? (
                <Buttons
                  cancelButtonLabel={cancelButtonLabel}
                  confirmButtonLabel={confirmButtonLabel}
                  onMouseDown={(): void => {
                    /** Prevents focus on edit button only if mouse is used to click button, but not when keyboard is used */
                    doNotFocusOnEditButton();
                  }}
                  onCancelClick={onCancelClick}
                />
              ) : (
                /** This is to allow Ctrl + Enter to submit without action buttons */
                <button css={buttonStyles} type="submit" />
              )}
            </div>
          ) : (
            /** Field is used here only for the label */
            renderReadView()
          )}
        </Form>
      )}
    </Formik>
  );
}
