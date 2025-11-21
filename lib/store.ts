import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ContentState {
  vehicles: any[]
  experiences: any[]
  travels: any[]
  cities: any[]
  services: any[]
  testimonials: any[]
  faqs: any[]
  loading: boolean
  error: string | null
}

const initialState: ContentState = {
  vehicles: [],
  experiences: [],
  travels: [],
  cities: [],
  services: [],
  testimonials: [],
  faqs: [],
  loading: false,
  error: null,
}

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setVehicles: (state, action: PayloadAction<any[]>) => {
      state.vehicles = action.payload
    },
    setExperiences: (state, action: PayloadAction<any[]>) => {
      state.experiences = action.payload
    },
    setTravels: (state, action: PayloadAction<any[]>) => {
      state.travels = action.payload
    },
    setCities: (state, action: PayloadAction<any[]>) => {
      state.cities = action.payload
    },
    setServices: (state, action: PayloadAction<any[]>) => {
      state.services = action.payload
    },
    setTestimonials: (state, action: PayloadAction<any[]>) => {
      state.testimonials = action.payload
    },
    setFAQs: (state, action: PayloadAction<any[]>) => {
      state.faqs = action.payload
    },
  },
})

export const {
  setLoading,
  setError,
  setVehicles,
  setExperiences,
  setTravels,
  setCities,
  setServices,
  setTestimonials,
  setFAQs,
} = contentSlice.actions

export const store = configureStore({
  reducer: {
    content: contentSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
