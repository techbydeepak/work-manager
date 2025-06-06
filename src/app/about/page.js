import { resolve } from "styled-jsx/css"

 async function takeTime(){

    await new Promise((resolve) => setTimeout(resolve, 3000))
}

export default async function About() {
    
    await takeTime();
    // throw new Error("This is manual error");
    return(
        <div>
            This is about page
        </div>
    )
}