document.addEventListener("DOMContentLoaded", () => {
    const moneyLabel = document.getElementById("money")
    const researchBtn = document.getElementById("researchBtn")
    const atractionsButton = document.getElementById("atractions")
    const demolishButton = document.getElementById("demolish")

    const selectMenu = document.getElementById("sMenu")
    const researchWindow = document.getElementById("researchWindow")
    const fenceMenu = document.getElementById("fenceMenu")

    const waitTxt = document.getElementById("waiting")
    const rWait = document.getElementById("rWait")

    const fenceBtn = document.getElementById("fenceBtn")
    const dirtPathBtn = document.getElementById("dirtPathBtn")
    const pathBtn = document.getElementById("pathBtn")

    const dinoBtn = document.getElementById("dinoBtn")
    const bigDinoBtn = document.getElementById("bigDinoBtn")
    const spinoBtn = document.getElementById("spinoBtn")
    const herbDinoBtn = document.getElementById("herbDinoBtn")
    const saurDinoBtn = document.getElementById("saurDinoBtn")
    const trikeBtn = document.getElementById("trikeBtn")

    const contentContainer = document.getElementById("contentContainer")
    const content = document.getElementById("contentGrid")

    let money = 2500000
    let researchLevel = 1

    let researchEnabled = false
    let { spawnX, spawnY } = false

    moneyLabel.textContent = "$" + money

    let selectMode = false
    let researchMode = false
    let dinoSelectorMode = false
    let decorateMode = false

    let putFenceMode = false
    let putDirtPathMode = false
    let putPathMode = false
    let demolishMode = false

    atractionsButton.addEventListener("click", () => {
        selectMode =! selectMode
        putFenceMode = false
        demolishMode = false
        researchMode = false
        dinoSelectorMode = false
        selectMenu.classList.toggle("enabled", selectMode)
        content.classList.toggle("enabled", selectMode)
        fenceMenu.classList.remove("enabled")
        researchWindow.classList.remove("enabled")

    })

    demolishButton.addEventListener("click", () => {
        demolishMode =! demolishMode
        putFenceMode = false
        selectMode = false
        researchMode = false
        content.classList.toggle("enabled", demolishMode)
        fenceMenu.classList.remove("enabled")
        selectMenu.classList.remove("enabled")
        researchWindow.classList.remove("enabled")
    })

    researchBtn.addEventListener("click", () => {
        if (researchLevel >= 6) {
            rWait.innerHTML = "All animals were researched"
        } if (selectMode || demolishMode || decorateMode) {
            return
        } else if (researchEnabled) {
            researchMode =! researchMode
            researchWindow.classList.toggle("enabled", researchMode)
        } else {
            researchMode =! researchMode
            researchWindow.classList.toggle("enabled", researchMode)
            researchEnabled = true
            putFenceMode = false
            demolishMode = false
            dinoSelectorMode = false
            fenceMenu.classList.remove("enabled")
            research()
            setTimeout(() => {
                researchWindow.classList.remove("enabled")
                researchEnabled = false
            }, 8000)
        }
    })

    fenceBtn.addEventListener("click", () => {
        putFenceMode =! putFenceMode
        putDirtPathMode = false
        putPathMode = false
    })

    dirtPathBtn.addEventListener("click", () => {
        putDirtPathMode =! putDirtPathMode
        putFenceMode = false
        putPathMode = false
    })

    pathBtn.addEventListener("click", () => {
        putPathMode =! putPathMode
        putDirtPathMode = false
        putFenceMode = false
    })

    dinoBtn.addEventListener("click", () => {
        delay()
        setTimeout(() => {
            createDinosaur("dino", "40px", 8000)
        }, 2000)
        delay()
        setTimeout(() => {
            delayEnd()
        }, 4000)
    })

    bigDinoBtn.addEventListener("click", () => {
        delay()
        setTimeout(() => {
            createDinosaur("bigDino", "60px", 18000)
        }, 2500)
        delay()
        setTimeout(() => {
            delayEnd()
        }, 4500)
    })

    spinoBtn.addEventListener("click", () => {
        delay()
        setTimeout(() => {
            createDinosaur("spino", "60px", 20000)
        }, 2500)
        delay()
        setTimeout(() => {
            delayEnd()
        }, 4500)
    })

    herbDinoBtn.addEventListener("click", () => {
        delay()
        setTimeout(() => {
            createDinosaur("herbDino", "50px", 20000)
        }, 2000)
        delay()
        setTimeout(() => {
            delayEnd()
        }, 4000)
    })

    saurDinoBtn.addEventListener("click", () => {
        delay()
        setTimeout(() => {
            createDinosaur("saurDino", "70px", 40000)
        }, 3000)
        delay()
        setTimeout(() => {
            delayEnd()
        }, 5000)
    })

    trikeBtn.addEventListener("click", () => {
        delay()
        setTimeout(() => {
            createDinosaur("trike", "50px", 40000)
        }, 2000)
        delay()
        setTimeout(() => {
            delayEnd()
        }, 4000)
    })

    content.addEventListener("click", (event) => {
            const rect = content.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const offsetY = event.clientY - rect.top;
            const cellX = Math.floor(offsetX / 400) + 1;
            const cellY = Math.floor(offsetY / 400) + 1;

            const existingImage = Array.from(content.children).find(img => {
                const imgX = parseInt(img.style.gridColumnStart, 10)
                const imgY = parseInt(img.style.gridRowStart, 10)
    
                return ( imgX === cellX && imgY === cellY )
            })

            setupEvent(event)

            if (existingImage) {
                if (demolishMode) {
                    destroyElement(existingImage, 5000)
                } if (selectMode || decorateMode) {
                    return
                } else {
                    dinoSelectorMode = true
                    putFenceMode = false
                    researchMode = false
                    fenceMenu.classList.toggle("enabled", dinoSelectorMode)
                    selectMenu.classList.remove("enabled")
                    researchWindow.classList.remove("enabled")
                    spawnX = cellX
                    spawnY = cellY
                }
            } else {
                fenceMenu.classList.remove("enabled")
            }
            if (selectMode) {
                if (putFenceMode) {
                    createElement("fence", "../img/cerca.png", "400px", 90000)
                } else if (putDirtPathMode) {
                    createElement("dirthPath", "../img/Estrada\ de\ terra.png", "100px", 400)
                } else if (putPathMode) {
                    createElement("path", "../img/Estrada\ asfaltada.png", "100px", 1000)
                }
            }
    })
    const step = 20
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'w': 
            contentContainer.scrollTop -= step 
            break;
            case 's': 
            contentContainer.scrollTop += step 
            break;
            case 'a': 
            contentContainer.scrollLeft -= step 
            break;
            case 'd': 
            contentContainer.scrollLeft += step 
            break;
        }
    })
    let event = null

    function setupEvent(eventListener) {
        event = eventListener
    }

    function createElement(elementClass, src, size, cost) {
            
        const rect = content.getBoundingClientRect();
        const cellX = Math.floor((event.clientX - rect.left) / 400) + 1;
        const cellY = Math.floor((event.clientY - rect.top) / 400) + 1;
    
        const element = document.createElement('img')
        element.classList.add(elementClass)
        element.src = src
        element.style.height = size
        element.style.width = size
        element.style.gridColumnStart = cellX
        element.style.gridRowStart = cellY
        content.appendChild(element)
    
        money -= cost
        moneyLabel.textContent = "$" + money
    
    }

    function createDinosaur(type, size, cost) {

        const rect = content.getBoundingClientRect();
        const cellX = Math.floor((event.clientX - rect.left) / 400) + 1;
        const cellY = Math.floor((event.clientY - rect.top) / 400) + 1;
    
        const dino = document.createElement('img')
        dino.classList.add("animal")
        content.appendChild(dino)
        if (type == "dino") {
            dinoSkin = Math.floor(Math.random() * 4) + 1
            dino.src = `../img/dinos/dino-${dinoSkin}.png`
        } else if (type == "bigDino" && researchLevel >= 2) {
            dinoSkin = Math.floor(Math.random() * 2) + 1
            dino.src = `../img/dinos/big-dino-${dinoSkin}.png`
        } else if (type == "herbDino" && researchLevel >= 3) {
            dinoSkin = Math.floor(Math.random() * 2) + 1
            dino.src = `../img/dinos/herb-dino-${dinoSkin}.png`
        } else if (type == "saurDino" && researchLevel >= 4) {
            dinoSkin = Math.floor(Math.random() * 2) + 1
            dino.src = `../img/dinos/saur-dino-${dinoSkin}.png`
        } else if (type == "spino" && researchLevel >= 5) {
            dinoSkin = Math.floor(Math.random() * 2) + 1
            dino.src = `../img/dinos/spino-${dinoSkin}.png`
        } else if (type == "trike" && researchLevel == 6) {
            dinoSkin = Math.floor(Math.random() * 2) + 1
            dino.src = `../img/dinos/trike-${dinoSkin}.png`
        } else {
            content.removeChild(dino)
            waitTxt.innerText = "Unresearched dinosaur"
            setTimeout(() => {
                delayEnd()
                waitTxt.innerText = "..."
                return
            }, 2500)
        }
        dino.style.height = size
        dino.style.width = size
        dino.style.gridColumnStart = spawnX
        dino.style.gridRowStart = spawnY
        dino.style.left = "150px"
        dino.style.top = "150px"
    
        money -= cost
        moneyLabel.textContent = "$" + money

    }

    function destroyElement(element, cost) {
        content.removeChild(element)
        money -= cost
        moneyLabel.textContent = "$" + money
    }

    function delay() {
        waitTxt.classList.add("enabled")
        dinoBtn.classList.add("disabled")
        bigDinoBtn.classList.add("disabled")
        spinoBtn.classList.add("disabled")
        herbDinoBtn.classList.add("disabled")
        saurDinoBtn.classList.add("disabled")
        trikeBtn.classList.add("disabled")
    }
    function delayEnd() {
        waitTxt.classList.remove("enabled")
        dinoBtn.classList.remove("disabled")
        bigDinoBtn.classList.remove("disabled")
        spinoBtn.classList.remove("disabled")
        herbDinoBtn.classList.remove("disabled")
        saurDinoBtn.classList.remove("disabled")
        trikeBtn.classList.remove("disabled")
    }
    function research() {
        researchWindow.classList.toggle("enabled", researchMode)
        if (researchLevel == 1) {
            money -= 80000
        } else if (researchLevel == 2) {
            money -= 85000
        } else if (researchLevel == 3) {
            money -= 120000
        } else if (researchLevel == 4) {
            money -= 180000
        } else if (researchLevel == 5) {
            money -= 185000
        }
        researchLevel++
    }
})