import styled from 'styled-components'

export const Container = styled.div`
  padding: 10px;
  display: flex;
  gap:10px;

  .divisor{
    width: 50vw;
    gap:10px;

    &.separe{
      justify-content: space-around;
    }
  }

  .container-graph{
    margin-top: 20px;
    width: 100%;
    /* display: flex; */

    div{
      width: 100%;

      /* & + div{
        width: 40%;
      } */
    }
  }

  .container-table{

  
    border: 2px solid #272727;
    background: #27272780;
  

    table{
      width: 100%;

      th{
        padding: 4px;
        font-size: 14px;
        background: #232324;
        color:#fff;
        text-align: center;
      }

      td{
        padding: 4px;
        font-size: 18px;
        /* background: #232324; */
        color:#fff;
        text-align: center;
      }
    }
  }

  .container-graph2{
    width: 90%;
    /* margin-top: 50px; */
  }

  .container-table2{
    margin-top: 10px;
    padding: 10px;
    width: 42vw;
  
    border: 2px solid #272727;
    background: #27272780;

    /* width: 100%; */
    table{
      width: 100%;

      th{
        padding: 4px;
        font-size: 14px;
        background: #232324;
        color:#fff;
        text-align: center;
      }

      td{
        padding: 4px;
        font-size: 18px;
        /* background: #232324; */
        color:#fff;
        text-align: center;
      }
    }


  }

  header{
    color:#fff;
    font-size: 22px;
    font-weight: bold;
    width: 100%;
    background: rgba(39, 39, 39, 0.5);
    padding: 8px 10px;
    display: block;
  }

  @media (max-width:1366px) and (max-height:700px){
    padding: 5px 10px;
    gap:5px;

    .container-graph{
      margin-top: 8px;
    }

    header{
      font-size: 16px;      
      padding: 8px 10px;
     
    }

    .container-table{
      table{
        th{
          padding: 3px;
          font-size: 12px;
        }

        td{
          padding: 3px;
          font-size: 16px;
        }
      }
    }
  }
`