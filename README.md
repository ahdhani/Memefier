# Memefier
* npm install
* npm start

# How to use Redux
<a href="https://redux.js.org/basics/basic-tutorial">Redux Basics</a>
<br>
Store : stores the value we need.<br>
Actions : We perform actions to update the values in the store.<br>
Reducer : Implements the actions(more specifically action types)
<br><br>
Explanation of Implementation : 
<hr>
Say we want to make a store <br>
store : { <br>
counter<br>
}
<br><br>
Which increments and decrements on actions increment and decrement respectively
<hr>
There will be a redux folder in project root directory
<br>
Inside the redux folder make a folder of which you want to make store for (say counter).
And make 3 files <b>counterActions.js</b> , <b>counterTypes.js</b> , <b>counterReducer.js</b>
<br>
Therefore your folder setup looks like :
<pre>
-redux
    -counter
        -counterActions.js
        -counterReducer.js
        -counterTypes.js
</pre>

<br>
counterTypes.js
<br><br>
For all Action Types do : <br>
export const ACTION_TYPE = 'ACTION_TYPE'
<br><br>
<b>counterActions.js</b>
<pre>
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DECREMENT = 'COUNTER_DECREMENT'
</pre>

counterReducer.js
<br><br>
<i>Reducer Snippet</i>
<pre>
// import the reqeuired Action types
import {} from './counterTypes.js'

const initialState = {
    // Create your store here
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case typeName:
        return { 
            ...state, 
            ...payload 
        }

    default:
        return state
    }
}
</pre>
<br><br>counterReducer.js
<pre>
import {COUNTER_INCREMENT , COUNTER_DECREMENT} from './counterTypes.js'

const initialState = {
    // Create your store here
    number : 10
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case COUNTER_INCREMENT:
        return { 
            ...state, 
            number : state.number + 1 
        }
    case COUNTER_DECREMENT:
        return {
            ...state ,
            number : state.number - 1
        }

    default:
        return state
    }
}
</pre>


counterActions.js
<br><br>
<i>Action Snippet</i>
<pre>
// Import thte required Action Types from counterActions
import {} from './counterActions.js'

export const actionName = (payload) => ({
    type: type,
    payload
})
</pre>
<br><br>counterAction.js
<pre>
import {COUNTER_INCREMENT , COUNTER_DECREMENT} from './counterActions.js'

export const incrementCounter = () => ({
    type: COUNTER_INCREMENT ,
    payload : {}
})

export const decrementCounter = () => ({
    type: COUNTER_DECREMENT ,
    payload : {}
})

</pre>
