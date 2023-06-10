import React from 'react'

export default function Ingredient(props) {

    const {name, amount} = props

    return (
        <>
            <span>{name}</span>
            <span>{amount}</span>        
        </>
    )
}
