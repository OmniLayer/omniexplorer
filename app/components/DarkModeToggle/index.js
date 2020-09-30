import React from 'react';
import useDarkMode from 'use-dark-mode';
import { Moon } from '@styled-icons/fa-solid/Moon';
import { Sun } from '@styled-icons/fa-solid/Sun';
import styled from 'styled-components';

const StyleIcon = (icon) => styled(icon)`
  text-decoration: none;
  background-color: transparent;

  &:hover {
    color: #2196f3;
    transition: .3s;
  }
`;
const MoonIcon = StyleIcon(Moon);
const SunIcon = StyleIcon(Sun);

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false);

  return (
    <div>
      {!darkMode.value && (<MoonIcon size={16} onClick={darkMode.toggle} />)}
      {!!darkMode.value && (<SunIcon size={16} onClick={darkMode.toggle} />)}
    </div>
  );
};

export default DarkModeToggle;
