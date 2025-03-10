import styled from 'styled-components'


const colorBackGround = "#232324"

export const Container = styled.div`
  width: 100vw;
  padding: 10px;

  ul{
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap:10px;

    li{
      width: 49.7%;
      padding: 10px;
      height: 46vh;
      background: ${colorBackGround};

      @media (max-width:1366px){
        width: 49.5%;
      }
      .header{
        color:#fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 25px;
        background: #282828;
        padding: 4px;

        span{
          display: block;
          font-size: 24px;
          font-weight: 500;
        }
      }

      .graph{

      }
    }
  }

  @media (max-width:1366px) and (max-height:700px){
    padding: 5px 10px;
   

    ul{
      li{

        .header{
          margin-bottom: 20px;
          span{
            font-size: 18px;
          }
        }
      }
    }
    
  }
`