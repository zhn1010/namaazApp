import { atom } from 'recoil';
import sorah from './sorah';

const localStorageEffect = (key: string) => ({setSelf, onSet}: any) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
  
    onSet((newValue: any, _: any, isReset: any) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
};

export const sorahState = atom({
    key: 'sorahState', 
    default: sorah.slice(0, 2), 
    effects: [
        localStorageEffect('current_sorah'),
    ]
});

export const zekrState = atom({
    key: 'zekrState', 
    default: [0, 1, 2, 3],
    effects: [
        localStorageEffect('current_zekr'),
    ] 
});