import styled from 'styled-components'

export const formLogin = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;


  > section {
    flex: 1;
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    padding: 2rem 1.875rem;


    #login {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 0 2rem;
    }


    #login .form {
      background-color: #f1f1f1;
      width: 100%;
      max-width: 480px;
      padding: .5rem;
    }

    #login .field label {
      display: block;
    }
    #login .field input {
      width: 100%;
    }
    #login .actions {
      text-align: right;
      margin-top: 1rem;
    }


    img {
      width: 10rem;
      margin-bottom: 2rem;
    }

    @media (max-width: 720px) {
      display: flex;
      flex-direction: column;
      padding-bottom: 8rem;

      img {
        align-self: center;
      }
    }
  }
`

export const Container = styled.div`
  width: 100%;
  max-width: 58.75rem;
  padding: 2rem;
  margin: 0 auto;
`

export const Inner = styled.main`
  background: ${({ theme }) => theme.colors.black};
  padding: 2rem 2.5rem;
  border-radius: 8px;
  text-align: center;
`

export const Title = styled.h2``

export const SubTitle = styled.h4`
  margin: 1rem 0;
`

export const Table = styled.table`
  margin: 0 auto;
`
