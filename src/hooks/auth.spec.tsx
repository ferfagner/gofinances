
import {AuthProvaider, useAuth} from './auth'

import { renderHook, act } from '@testing-library/react-hooks'

jest.mock('expo-auth-session',()=>{
  return{
    startAsync: ()=>{
      return {
        type: 'success',
        params:{
          access_Token: 'googletoken'
        }
      }
    }
  }
})


describe('Testando os meus hooks', ()=>{

    it('should by apple to sigin in with gogole', async ()=>{

      global.fetch = jest.fn(()=> Promise.resolve({
        json: () => Promise.resolve({
          id: `userInfo.id`,
          email: `userInfo.email`,
          name: `userInfo.given_name`,
          photo: `userInfo.picture`,
          locale: `userInfo.locale`
        })
      })) as jest.Mock;

      const {result} =  renderHook(()=> 
      useAuth(), 
      { 
        wrapper: AuthProvaider
      });

      await act(()=> result.current.signinWithGoogle());

      
      expect(result.current.user).toBeTruthy()

    });

});