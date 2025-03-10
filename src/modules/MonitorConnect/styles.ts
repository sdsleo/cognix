import styled from 'styled-components'


const colorBackGround = "#232324"

export const Container = styled.div`
  width: 100vw;
  padding: 10px;
  position: relative;

  header{
    background-color: ${colorBackGround};
    width: 100%;
    padding: 12px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 6px;


    & > span{
      color: #E1E1E1;
      font-size: 26px;
      font-weight: 400;
    }


    div{
      display: flex;
      gap: 10px;

      span{
        color: #FFA011;
        font-size: 22px;
        font-weight: 400;
      }

      svg{
        fill:  #E1E1E1;
      }
    }
  }


  ul{
    list-style: none;
    display: flex;
    margin-top: 10px;
    gap:10px;

    li{
      width: 50%;

      .name{
        width: 100%;
        background-color: ${colorBackGround};
       
        border-radius: 6px;

        display: flex;
        flex-direction: column;
        /* align-items: center; */

        div{
          display: flex;
          justify-content: flex-end;
          padding: 4px 4px;
          gap: 4px;
          /* background-color: red; */

          button{
            width: 30px;
            height: 30px;
            background: #2A2A2B;
            color:#2a2a2b;
            border: none;
            border-radius: 6px;
          }

          svg{
            fill:  #E1E1E1;
          }
        }

        article{
          display: flex;
          justify-content: center;
          padding: 30px;
          padding-top: 2px;
          
          span{
            font-size: 32px;
            font-weight: 500;
            color: #E1E1E1;
          }
        }

        @media (max-width: 1366px){
          article {
            span{
              font-size: 26px;
            }
          }
        }
      }

      .default{
        width: 100%;
        background-color: ${colorBackGround};
        border-radius: 6px;
        margin-top: 10px;
        padding: 6px 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        span{
          color: #989898;
          font-size: 18px;
          font-weight: 400;
        }

        .ok{
          color:#5EAC6D;
          font-size: 32px;
          padding: 30px;
          
        }

        .nok{
          color:#B43A3A;
          font-size: 32px;
          padding: 30px;
          
        }

        h3{
          font-size: 26px;
          padding: 20px;
          color: #E1E1E1;

          
        }

        @media (max-width: 1366px){
            span{
              font-size: 16px;
            }

            h3{
              font-size: 24px;
            }

            .ok{
              
              font-size: 28px;
              padding: 20px;
              
            }

            .nok{ 
              font-size: 28px;
              padding: 20px;
            }
          }
      }


      .logs{
        width: 100%;
        background-color: ${colorBackGround};
        border-radius: 6px;
        margin-top: 10px;

        min-height: calc(100vh - 501px);

        /* @media (min-height: 818px) {
          min-height: calc(100vh - 611px);
        } */

        @media (max-width:1366px) {
          min-height: calc(100vh - 462px);
        }

        

        .header-logs{
          display: flex;
          flex-direction: column;

          div{
            z-index: 99;
          display: flex;
          justify-content: flex-end;
          padding: 4px 4px;
          gap: 4px;
          /* background-color: red; */

            button{
              width: 30px;
              height: 30px;
              background: #2A2A2B;
              color:#2a2a2b;
              border: none;
              border-radius: 6px;
            }

            svg{
              fill:  #E1E1E1;
            }
          }

          article{
            display: flex;
            justify-content: center;
            padding: 6px;
            padding-top: 2px;
            margin-top: -34px;
            
            span{
              font-size: 22px;
              font-weight: 500;
              color: #989898;
            }
          }
        }
        

        .body-logs{
          padding: 10px;

          .body-header{
            border-radius: 6px;
            background: #2A2A2B;
            display: flex;

            span{
              display: block;
              color:#6AB0D9;
              width: 50%;
              font-size: 16px;
              padding: 6px;
              font-weight: 500;
            }
          }

          .body-container{
            overflow-y: overflow;
            color: #eee;
            
            div{
              display: flex;
              padding: 4px;
              gap:2px;
              font-size: 16px;

              & + div {
                margin-top: 5px;
              }

              span{
                display: block;
              }

              & > span{
                width: 30%;

                & + span{
                  flex: 1;
                  margin-left: 10px;
                }
              }


            }
          }
        }
      }
    }
  }

  @keyframes Rotatew {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

  .anime{
    cursor: not-allowed !important;
    svg{
      animation: Rotatew 1.2s linear infinite;
    }
  }
  @keyframes PulseView {
		from {
			transform: scale(1);
		}

		to {
			transform: scale(0.1);
		}
	}

  .animePulse{
    cursor: not-allowed !important;
    svg{
      animation: PulseView 0.5s linear infinite;
    }
  }
`

export const Full = styled.div`
  background: rgb(35, 35, 36);
  height: calc(100vh - 60px);
  /* background: red; */
  position: absolute;
  width: 99%;
  top: 10px;
  left: 0px;
  padding: 10px;
  margin-left: 10px;
  z-index: 100;

  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;

    span{
      display: block;
    }
  }

  .title{
    font-size: 22px;
    color:#BCBCBC
  }

  .close{
    font-size: 22px;
    font-weight: bold;
    padding: 8px 16px;
    background-color: #2A2A2B;
    border-radius: 4px;
    color:#BCBCBC
  }


  ul{
    list-style: none;
    width: 100%;
    padding: 0px 6px;
    display: block;
  }

  li{
    list-style: none;
    color:#BCBCBC;
    display: flex;
    background-color: #2A2A2B;
    padding: 12px;
    width: 100% !important;
    border-radius: 4px;

    & + li {
                margin-top: 7px;
      }

    .time{
      width: 200px;
    }

    .type{
      width: 200px;
    }

    .desc{
      flex:1
    }

    .title{
      color: #6AB0D9;
      font-weight: bold;
      font-size: 14px;
    }

    
  }

  .limiter{
    overflow-y: auto;
    max-height: calc(100vh - 200px);
    ul{
        margin-top: 7px;
    }
  }

`