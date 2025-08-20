import React, { createContext, useContext, useReducer } from 'react';

// Contexts séparés
const LernDataContext = createContext();
const UserDataContext = createContext();

// Reducer pour les données utilisateur
const userDataReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_USER_DATA':
      return action.payload;
      
    case 'UPDATE_EXERCISE_RESULT':
      const { skillType, level, exerciseId, note } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [skillType]: {
            ...state.data[skillType],
            [level]: {
              ...state.data[skillType][level],
              data: {
                ...state.data[skillType][level].data,
                [exerciseId]: {
                  ...state.data[skillType][level].data[exerciseId],
                  lastNote: note
                }
              }
            }
          }
        }
      };
      
    case 'UPDATE_LEVEL_INDEX':
      const { skillType: skill, level: lvl, newIndex } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [skill]: {
            ...state.data[skill],
            [lvl]: {
              ...state.data[skill][lvl],
              index: newIndex
            }
          }
        }
      };
      
    case 'SAVE_CURRENT_ANSWERS':
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          [action.payload.exerciseId]: {
            answers: action.payload.answers,
            timestamp: Date.now()
          }
        }
      };
      
    case 'UPDATE_USER_SETTINGS':
      return {
        ...state,
        nativeLanguage: action.payload.nativeLanguage || state.nativeLanguage,
        subscription: action.payload.subscription || state.subscription
      };
      
    default:
      return state;
  }
};

// Reducer pour les données d'apprentissage (lecture seule)
const lernDataReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_LERN_DATA':
      return action.payload;
    default:
      return state;
  }
};

// Provider principal
export const AppDataProvider = ({ children }) => {
  // État initial basé sur votre structure
  const initialUserData = {
    clientid: "",
    nativeLanguage: "FR",
    subscription: "31.12.2025",
    paiementInfos: "",
    data: {
      lesen: {
        A1: { index: 0, total: 0, data: {} },
        A2: { index: 0, total: 0, data: {} },
        B1: { index: 0, total: 0, data: {} },
        B2: { index: 0, total: 0, data: {} },
        C1: { index: 0, total: 0, data: {} },
        C2: { index: 0, total: 0, data: {} }
      },
      hoeren: {
        A1: { index: 0, total: 0, data: {} },
        A2: { index: 0, total: 0, data: {} },
        B1: { index: 0, total: 0, data: {} },
        B2: { index: 0, total: 0, data: {} },
        C1: { index: 0, total: 0, data: {} },
        C2: { index: 0, total: 0, data: {} }
      },
      schreiben: {
        A1: { index: 0, total: 0, data: {} },
        A2: { index: 0, total: 0, data: {} },
        B1: { index: 0, total: 0, data: {} },
        B2: { index: 0, total: 0, data: {} },
        C1: { index: 0, total: 0, data: {} },
        C2: { index: 0, total: 0, data: {} }
      },
      sprechen: {
        A1: { index: 0, total: 0, data: {} },
        A2: { index: 0, total: 0, data: {} },
        B1: { index: 0, total: 0, data: {} },
        B2: { index: 0, total: 0, data: {} },
        C1: { index: 0, total: 0, data: {} },
        C2: { index: 0, total: 0, data: {} }
      },
      vokabeln: {
        A1: { index: 0, total: 0, data: {} },
        A2: { index: 0, total: 0, data: {} },
        B1: { index: 0, total: 0, data: {} },
        B2: { index: 0, total: 0, data: {} },
        C1: { index: 0, total: 0, data: {} },
        C2: { index: 0, total: 0, data: {} }
      },
      grammar: {
        A1: { index: 0, total: 0, data: {} },
        A2: { index: 0, total: 0, data: {} },
        B1: { index: 0, total: 0, data: {} },
        B2: { index: 0, total: 0, data: {} },
        C1: { index: 0, total: 0, data: {} },
        C2: { index: 0, total: 0, data: {} }
      }
    },
    currentSession: {} // Pour les réponses temporaires
  };

  const [lernData, lernDispatch] = useReducer(lernDataReducer, {
    lesen: {},
    hoeren: {},
    schreiben: {},
    sprechen: {},
    vokabeln: {},
    grammar: {}
  });

  const [userData, userDispatch] = useReducer(userDataReducer, initialUserData);

  return (
    <LernDataContext.Provider value={{ lernData, lernDispatch }}>
      <UserDataContext.Provider value={{ userData, userDispatch }}>
        {children}
      </UserDataContext.Provider>
    </LernDataContext.Provider>
  );
};

// Hooks de base
export const useLernData = () => {
  const context = useContext(LernDataContext);
  if (!context) {
    throw new Error('useLernData must be used within AppDataProvider');
  }
  return context;
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserData must be used within AppDataProvider');
  }
  return context;
};