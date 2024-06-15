import React, { FC, useMemo, useState } from 'react';
import { Field, FieldProps } from 'formik';
import {
  HiEye,
  HiEyeSlash,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
} from 'react-icons/hi2';
import { MdQuestionMark } from 'react-icons/md';
import ToolTip from '../ToolTip';

export type InputProps = {
  /**
   * The label text
   */
  label?: string;
  /**
   * The success class name
   */
  successClassName?: string;
  currentState?: 'success' | 'error' | 'default';

  /**
   * The error class name
   */
  errorClassName?: string;
  wStateIcon?: boolean;

  /**
   * The helper text
   */
  helperText?: string;
  /**
   * The input type
   */
  tooltipText?: string;
  type: string;
  maxchars?: number;
  icon?: React.ReactNode | string;

  iconOnClick?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = ({
  label,
  helperText,
  type,
  tooltipText,
  maxchars,
  icon,
  iconOnClick,
  wStateIcon,
  currentState,
  ...input
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const _currentState = useMemo(() => {
    if (currentState === 'success') {
      return 'success';
    }
    if (currentState === 'error') {
      return 'error';
    }
    return 'default';
  }, [currentState]);
  const [_type, setType] = useState(type);
  const isPassword = useMemo(() => type === 'password', []);
  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
    setType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  return (
    <fieldset>
      <span className="flex items-center justify-between w-full">
        <label className="block mb-1 font-main text-dark-500 opacity-60 text-body-2">
          {label}
        </label>
        <span className="flex flex-col">
          {tooltipText && (
            <span className="border border-white rounded-full shadow">
              <ToolTip content={tooltipText} strategy="fixed">
                <MdQuestionMark className="w-3 h-3 border border-white rounded-full shadow-sm text-g-primary-500" />
              </ToolTip>
            </span>
          )}
        </span>
      </span>
      <span className="relative z-0 h-full">
        <input
          {...input}
          className={`${
            _currentState !== 'default' &&
            `${_currentState === 'success' ? 'border-success' : 'border-error'}`
          } block w-full min-w-[228px] px-4 py-4 border rounded-md shadow-sm border-dark-200 focus:border-dark-300 focus:ring-dark-300 shadow-all   sm:text-sm`}
          type={_type}
        />
        <span className="absolute flex items-center justify-center w-6 h-6 gap-1 text-center right-2 inset-y-1/4 align-center">
          {isPassword && (
            <button
              type="button"
              onClick={handlePasswordVisibility}
              className=""
            >
              {!showPassword ? (
                <HiEye className="w-4 h-4 text-dark-500 opacity-60" />
              ) : (
                <HiEyeSlash className="w-4 h-4 text-dark-500 opacity-60" />
              )}
            </button>
          )}
          {wStateIcon && _currentState !== 'default' && (
            <span className="mr-2">
              {_currentState === 'success' ? (
                <HiOutlineCheckCircle className="w-4 h-4 text-success" />
              ) : (
                <HiOutlineXCircle className="w-5 h-5 text-error" />
              )}
            </span>
          )}
        </span>
      </span>
      <span
        className={`${
          _currentState === 'error' && 'text-error'
        } flex items-center justify-between text-body-3 text-dark-500 opacity-60 `}
      >
        <p>{helperText}</p>
        <p>
          {maxchars && (
            <>
              {input.value?.['length' as keyof typeof input.value]}/{maxchars}
            </>
          )}
        </p>
      </span>
    </fieldset>
  );
};
export default Input;

type InputFieldProps = Omit<InputProps, 'currentState'>;

export const InputField = (props: InputFieldProps) => {
  const { name, label, helperText, type, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => {
        return (
          <Input
            {...field}
            {...rest}
            label={label}
            helperText={
              (form?.errors?.[name || ''] as string) || helperText || ''
            }
            type={type}
            currentState={
              !form.touched?.[name || '']
                ? 'default'
                : form?.errors?.[name || '']
                ? 'error'
                : 'success'
            }
          />
        );
      }}
    </Field>
  );
};
