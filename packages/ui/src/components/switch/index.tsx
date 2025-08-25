import { motion, useCycle } from 'framer-motion';
import { useEffect } from 'react';

export interface SwitchBaseProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
}

export function SwitchBase(props: SwitchBaseProps) {
  const { value = false, onChange = () => void 0, disabled = false } = props;
  return (
    <motion.div
      style={{
        width: 36,
        height: 20,
        borderRadius: 16,
        backgroundColor: 'rgba(120,120,128,.56)',
        position: 'relative',
        cursor: 'pointer',
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
      }}
      animate={value ? 'on' : 'off'}
      initial={false}
      onTapStart={() => onChange(!value)}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 16,
          backgroundColor: '#34C759',
        }}
        variants={{ off: { scale: 0 }, on: { scale: 1 } }}
        transition={{ ease: 'easeInOut' }}
      />
      <motion.div
        style={{
          width: 16,
          height: 16,
          borderRadius: 16,
          backgroundColor: 'white',
          boxShadow: '0 0 0 0.5px rgba(0,0,0,.04), 0 3px 8px 0 rgba(0,0,0,.15), 0 3px 1px 0 rgba(0,0,0,.06)',
          position: 'absolute',
          top: 2,
          left: 2,
        }}
        variants={{ off: { x: 0 }, on: { x: 16 } }}
        transition={{ ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
