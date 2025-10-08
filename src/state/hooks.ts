import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';

// Hook personalizado para dispatch con tipado
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Hook personalizado para selector con tipado
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
