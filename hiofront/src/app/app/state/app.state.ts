import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../../auth/state/auth.reducers';
import { EventsState } from '../../events/state/events.reducers';
import { CitiesState } from '../../cities/state/cities.reducers';
import { HomeState } from '../../home/state/home.reducers';
import { CommentsState } from '../../comments/state/comments.reducers';
import { UsersState } from '../../users/state/users.reducers';

/*In particular, you might use NgRx when you build an 
application with a lot of user interactions and multiple 
data sources, or when managing state in services are no 
longer sufficient. */

/*
Для удобства получения срезов состояния верхнего уровня 
глобального объекта используйте функцию NgRx 
createFeatureSelector(), 
которая строковым параметром принимает один из верхних ключей.
*/
export const selectAuthState = createFeatureSelector<AuthState>('authState');

/*
Селекторы создаются с помощью функции NgRx createSelector(), 
которая может принимать неограниченное количество функций, 
каждая из которых возвращает определенную часть состояния. 
При этом самой последней функции, которая и возвращает конечный
 результат, в качестве аргументов передаются результаты первых
  функций.
*/

export const selectError = () => createSelector(
    selectAuthState,
    (state: AuthState) => state.error
)

export interface AppState {
  authState: AuthState
  eventsState: EventsState
  citiesState: CitiesState
  homeState: HomeState
  commentsState: CommentsState
  usersState: UsersState
}