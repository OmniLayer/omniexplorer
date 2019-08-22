import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  padding: 2rem;
  margin-top: 1rem;
  width: 100%;
  background: #917dcf;
  background-image: linear-gradient(224deg, #b06ab3, #917dcf 41%, #6699f8);
  color: #fff;
  font-size: 30px;
  text-align: center;
`;

function GuardaBanner() {
  return (
    <a
      href="https://guarda.co/?utm_source=blockexplorers&utm_medium=banner&utm_campaign=guarda"
      target="_blank"
    >
      <Wrapper>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43 48" width="100">
          <g fill="#FFF" fillRule="evenodd">
            <path d="M20.891 10.672L9.785 13.394a.183.183 0 0 0-.137.161c-.014.187-1.362 18.704 11.227 23.016a.194.194 0 0 0 .117 0c12.589-4.312 11.242-22.83 11.227-23.016a.18.18 0 0 0-.137-.161l-11.106-2.722a.163.163 0 0 0-.085 0" />
            <path d="M42.201 5.347c.029.345 2.543 34.627-20.946 42.61a.33.33 0 0 1-.218 0C-2.451 39.975.063 5.693.09 5.348a.336.336 0 0 1 .255-.299L21.066.01a.348.348 0 0 1 .16 0l20.72 5.04c.14.034.244.153.255.298zm-3.751 3.32a.275.275 0 0 0-.21-.244L21.212 4.281a.269.269 0 0 0-.13 0L4.05 8.423a.273.273 0 0 0-.209.244c-.023.285-2.09 28.459 17.215 35.02a.248.248 0 0 0 .178 0C40.54 37.126 38.473 8.952 38.45 8.667z" />
          </g>
        </svg>
        <span>Guarda Wallet</span>
        <span>CRYPTOCURRENCY MANAGEMENT MADE EASY</span>
      </Wrapper>
    </a>
  );
}

export default GuardaBanner;
