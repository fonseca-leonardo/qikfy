"use client";
import Image from "next/image";
import "./global.css";

import { Popover } from "react-tiny-popover";
import { useState } from "react";

export default function Home() {
  const [popoverState, setPopoverState] = useState(false);

  return (
    <main>
      <section>
        <div className="qik-container">
          <div className="qik-container-item qik-col-12-lg">
            <h1>Login</h1>
          </div>
          <div className="qik-container-item qik-col-12-lg">
            <form>
              <div className="qik-container">
                <div className="qik-container-item qik-col-12-lg">
                  <input placeholder="Email"></input>
                </div>
                <div className="qik-container-item qik-col-12-lg">
                  <button>Clicar</button>
                </div>
              </div>
            </form>
          </div>
          <div className="qik-container-item">
            <section>
              <a href="/">Esqueci minha senha</a>
            </section>
          </div>
        </div>
      </section>
      <section>
        {[1, 2, 3, 4].map((el) => (
          <Popover
            key={el}
            isOpen={popoverState}
            content={<>pop over</>}
            positions={["right"]}
            onClickOutside={() => setPopoverState(false)}
          >
            <button onClick={() => setPopoverState(true)}>AQUI</button>
          </Popover>
        ))}
      </section>
    </main>
  );
}
