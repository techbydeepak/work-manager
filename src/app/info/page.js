"use client"

export default function Info() {
    console.log("This is server side compoment");
    
  return (
    <div>
      <h1> This is info component</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero. Sed cursus ante dapibus diam
      </p>
      <button className="px-4 py-2 bg-blue-600 rounded">Click</button>
      
    </div>
  );
}
