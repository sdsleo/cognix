import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Contact from "../../assets/icons/FluentUI/SVGs/Contact";
import Signin from "../../assets/icons/FluentUI/SVGs/Signin";
import Error from "../../assets/icons/FluentUI/SVGs/Error";
import Eye from "../../assets/icons/FluentUI/SVGs/Eye";
import Hide3 from "../../assets/icons/FluentUI/SVGs/Hide3";
import CognixLogo from "../../assets/images/cognix-logo.png";
import useFetch from "../../hooks/useFetch";
import { login, MES_LOGIN } from "./routes/login.routes";
import "./styles.css";
import { AuthContext } from '../../context/authContext';

export function Login() {
  const { handleSetUser, addPermissions } = useContext(AuthContext)
  const navigate = useNavigate();
  useEffect(() => {
    document
      .querySelector(".cnx-login-form-container-clfc")!
      .classList.add("cnx-login-form-container-transform");
  }, []);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { request } = useFetch();

  const handleLoginSubmit = async () => {
    document
      .getElementById("cnx-span-login-loading-id-cslli")
      ?.classList.remove("display-none");
    document
      .getElementById("cnx-span-login-id-csli")
      ?.classList.add("display-none");

    // const { url, options } = MES_LOGIN({ username, password });
    // const { response, json } = await request(url, options);

    // if (response?.ok) {
    //   window.localStorage.setItem(
    //     "@CNX_MES_LOGIN_SESSION",
    //     JSON.stringify(json)
    //   );
    //   navigate("/");
    // } else {
    //   document
    //     .querySelector(".cnx-error-message-login-ceml")
    //     ?.classList.remove("cnx-visibility-hidden");
    //   document
    //     .getElementById("cnx-span-login-loading-id-cslli")
    //     ?.classList.add("display-none");
    //   document
    //     .getElementById("cnx-span-login-id-csli")
    //     ?.classList.remove("display-none");
    // }

    try {
      // const response = await login({
      //   password,
      //   username
      // })

      const response = { 
        data: {
          "authenticated": true,
          "created": "2025-02-24 11:58:29",
          "expiration": "2025-03-08 01:45:09",
          "accesToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjAiLCJqdGkiOiJjMDQ1NjgzNi05M2JhLTQ3Y2MtOWFmMy1mM2ZmYzc5Y2UzOGMiLCJ1c2VySWQiOiIyMCIsInVzZXJuYW1lIjoiY29nbml4IiwibmJmIjoxNzQwNDA5MTA5LCJleHAiOjE3NDE0MDkxMDksImlhdCI6MTc0MDQwOTEwOSwiaXNzIjoiRXhlbXBsb0lzc3VlciIsImF1ZCI6IkV4ZW1wbG9BdWRpZW5jZSJ9.5_FmfAZMn601H6AGDgRbQmd0RYTAWgtHohIBNCXRl5c",
          "userName": "cognix",
          "message": "Usuário Logado com sucesso",
          "tenants": [
            {
              "tenantCode": "T0010",
              "tenantName": "Bahia",
              "interfaces": [
                {
                  "interfaceCode": "10130",
                  "interfaceName": "Ordens",
                  "functionalities": [
                    "10"
                  ]
                },
                {
                  "interfaceCode": "10130",
                  "interfaceName": "Ordens",
                  "functionalities": [
                    "10",
                    "20"
                  ]
                },
                {
                  "interfaceCode": "10150",
                  "interfaceName": "Controle Logístico",
                  "functionalities": [
                    "30",
                    "40"
                  ]
                },
                {
                  "interfaceCode": "10160",
                  "interfaceName": "Calendario Manutenção",
                  "functionalities": [
                    "40",
                    "50"
                  ]
                }
              ]
            }
          ],
          "userId": 0
        }
      }

      const token = response.data.accesToken
      handleSetUser({
        name: response.data.userName,
        id: token
      })

      addPermissions(response.data.tenants)

      navigate("/")

    } catch (err) {
      document
        .querySelector(".cnx-error-message-login-ceml")
        ?.classList.remove("cnx-visibility-hidden");
      document
        .getElementById("cnx-span-login-loading-id-cslli")
        ?.classList.add("display-none");
      document
        .getElementById("cnx-span-login-id-csli")
        ?.classList.remove("display-none");
    }
  };

  const handleInputOnFocus = (id: string) => {
    document
      .getElementById(id)
      ?.classList.add("cnx-login-form-input-on-foucus");
    document.querySelector(id)?.classList.add("cnx-login-form-icon-on-foucus");
  };

  const handleInputOnBlur = (id: string) => {
    document
      .getElementById(id)
      ?.classList.remove("cnx-login-form-input-on-foucus");
  };

  const actionKeySearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLoginSubmit();
    }
  };

  const handleChangeUserInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    document
      .querySelector(".cnx-error-message-login-ceml")
      ?.classList.add("cnx-visibility-hidden");

    setUsername(event.target.value);
  };

  const handleChangePasswordInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    document
      .querySelector(".cnx-error-message-login-ceml")
      ?.classList.add("cnx-visibility-hidden");

    setPassword(event.target.value);
  };

  const handleChangeInputType = () => {
    var x: any = document.getElementById("cnx-login-password");
    if (x.type === "password") {
      x.type = "text";
      setShowPassword(true);
    } else {
      x.type = "password";
      setShowPassword(false);
    }
  };

  return (
    <div className="cnx-login-container-clc">
      <form className="cnx-login-form-container-clfc">
        <img className="cnx-login-form-cognix-logo" src={CognixLogo} />
        <p>Conecte-se ao MES. Informe os dados abaixo</p>
        <section className="cnx-login-form-section-clfs">
          <div className="cnx-input-content">
            <div className="cnx-login-container-input-icon">
              <Contact
                width="1.1rem"
                height="1.1rem"
                className={
                  username?.length > 0
                    ? "cnx-login-input-icon cnx-login-form-icon-on-foucus"
                    : "cnx-login-input-icon"
                }
              />
            </div>
            <input
              id="cnx-login-user"
              className="cnx-input-login-user-cilu"
              type="text"
              autoComplete="off"
              placeholder="Usuário"
              onKeyUp={(event) => actionKeySearch(event)}
              onChange={(event) => handleChangeUserInput(event)}
              onFocus={() => handleInputOnFocus("cnx-login-user")}
              onBlur={() => handleInputOnBlur("cnx-login-user")}
            />
          </div>
          <div className="cnx-input-content">
            <div className="cnx-login-container-input-icon">
              <Signin
                width="1.2rem"
                height="1.2rem"
                className={
                  password?.length > 2
                    ? "cnx-login-input-icon cnx-login-form-icon-on-foucus"
                    : "cnx-login-input-icon"
                }
              />
            </div>
            {password?.length > 0 ? (
              <button
                type="button"
                tabIndex={-1}
                formTarget="none"
                className="cnx-login-container-input-show-password-icon"
                onClick={() => handleChangeInputType()}
              >
                {showPassword ? (
                  <Hide3
                    width="1.2rem"
                    height="1.2rem"
                    className="cnx-login-input-icon"
                  />
                ) : (
                  <Eye
                    width="1.2rem"
                    height="1.2rem"
                    className="cnx-login-input-icon"
                  />
                )}
              </button>
            ) : null}

            <input
              id="cnx-login-password"
              className="cnx-input-login-user-cilu"
              type="password"
              hidden={false}
              placeholder="Senha"
              onKeyUp={(event) => actionKeySearch(event)}
              onChange={(event) => handleChangePasswordInput(event)}
              onFocus={() => handleInputOnFocus("cnx-login-password")}
              onBlur={() => handleInputOnBlur("cnx-login-password")}
            />
          </div>
          <div className="cnx-error-message-login-ceml cnx-visibility-hidden">
            <Error />
            <span>Usuário ou senha inválidos</span>
          </div>
          <a tabIndex={-1} href="" className="cnx-forgot-my-password-cfmp">
            <p>Esqueci minha senha</p>
          </a>
          <button
            className="cnx-input-login-button-cilb"
            type="button"
            onClick={() => handleLoginSubmit()}
          >
            <div
              id="cnx-span-login-loading-id-cslli"
              className="cnx-span-login-loading-csll display-none"
            >
              <span className="loader"></span>
              <span className="loading-span">Entrando...</span>
            </div>
            <span id="cnx-span-login-id-csli" className="cnx-span-login-csl">
              Entrar
            </span>
          </button>
        </section>
        <section className="cnx-login-copyright-version-section-clcvs">
          <p>©copyright Cognix Sistemas de Automação e TI Industrial</p>
          <p>{window.about.version}</p>
        </section>
      </form>
    </div>
  );
}
