import styled from 'styled-components'

export const ContainerRelations= styled.div`
  width: 100%;
  margin-left: 20px;
 
  article{
    margin-top: 10px;
    & + article{
      margin-top: 30px;
    }

    div{
      display: flex;
      
      span{
        width: 120px;
        font-size: 14px;
        font-weight: 500;
        color: var(--cnx-secondary-text);

        & + span{
          font-size: 13px;
        }
      }

    }

    p{
      margin-top: 6px;
      color: var(--cnx-secondary-text);
      font-size: 0.95rem;
    }
  }
`