import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;

  header{
    background: #272727;
    display: block;
    width: inherit;
    padding: 10px;

    
    span{
      text-align: center;
      display: block;
      color: #ffffff;
      font-size: 30px;
      font-weight: 400;

      
    }

    
  }


  @media (max-width:1366px) and (max-height:700px){        
    header{
      padding:5px 10px;
      
      span{
        font-size: 28px !important;
      }
    }
  }
`


export const Row = styled.div`
  display: flex;
  gap:10px;
  margin-top: 10px;
  justify-content: center;
    

  &.tables{
      justify-content:space-between;
      padding: 0px 20px;
    }

  & + div{
    margin-top: 50px;

    
  }

  div{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    span{
      display: block;
      color: #16bdbd;
      font-size:22px;
      font-weight: 400;

      & + span{
        color: #ffffff;
        font-size:18px;
        font-weight: 400;
        margin-top: 5px;

        b{
          font-size: 34px;
        }
      }
    }
  }


  article{
    width: 44%;

    h2{
      background: #272727;
      color:#ffffff;
      text-align: center;
      width: 100%;
      padding: 5px;
      margin: 0px;
    }

    table{
      width: 100%;
      margin-top: 10px;
      border-collapse: collapse;
      /* border:1px solid #ccc; */
    

    
      th{
        text-align: center;
        color:#ffffff;
        /* border:1px solid #ccc; */
        padding: 2px;
        
      }

      td{
        text-align: center;
        color:#ffffff;
        padding: 5px 0px;
        font-size: 20px;
        
      }

      tr{
       line-height: 30px;
      }
    }
  }

  .table{
    border: 2px solid #272727;
    background: #27272780;
    color: rgb(255, 255, 255);
    background: rgb(50, 50, 50);
    padding: 4px;
  }


  @media (max-width:1366px) and (max-height:700px){        
    gap:8px;
    margin-top: 8px;

    & + div{
      margin-top: 20px;    
    }

    div{
      span{
        font-size:18px;
        & + span{
          font-size:16px;
          b{
            font-size: 24px;
          }
        }
      }
    }

  }

  
`