const handleLogin = async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      /*  result.message === "success"
        ? localStorage.setItem("token", result.token)
        : alert("error");*/
    } catch (error) {
      console.log(error);
    }
  };
  
  const myElement = document.getElementById("enviar");
  myElement.addEventListener("click", () => {
    handleLogin();
  });