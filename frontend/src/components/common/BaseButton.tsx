import { MouseEventHandler, ReactNode } from 'react';
import { Icon } from '@iconify/react';
import styles from './BaseButton.module.css';

interface BaseButtonProps {
  text?: string; // The button text.
  clickHandler: MouseEventHandler;
  iconJSX?: ReactNode; // The node to be used as the icon for the button, if any.
  isLoading?: boolean; // A state that changes the button to its loading version.
  disableWhileLoading?: boolean;
  loadingText?: string; // The text on the button while isLoading is true.
}

export default function BaseButton(props: BaseButtonProps) {

  return (
    <button
      className={ styles.button }
      type="button"
      onClick={ props.clickHandler }
      disabled={ props.disableWhileLoading && props.isLoading }
    >
      { props.isLoading
        ? <div className={ styles.icon }><Icon icon="eos-icons:bubble-loading" /></div>
        : props.iconJSX && <div className={ styles.icon }>{ props.iconJSX }</div> }
      { props.isLoading
        ? props.loadingText ?? 'Loading...'
        : props.text }
    </button>
  );
}