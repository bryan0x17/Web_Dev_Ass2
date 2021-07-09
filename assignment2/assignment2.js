const firstNameNode = document.getElementById('firstName');
const lastNameNode = document.getElementById('lastName');
const addressNode = document.getElementById('address');
const postCodeNode = document.getElementById('postCode');
const phoneNode = document.getElementById('phone');
const emailNode = document.getElementById('email');
const cubeButton = document.getElementById('cubeButton');
const cylinderButton = document.getElementById('cylinderButton');
const sphereButton = document.getElementById('sphereButton');
const coneButton = document.getElementById('coneButton');

let type;

let asyncRequest;
let submitRequest;

let lengthNode;
let widthNode;
let heightNode;
let radiusNode;
let radius2Node;
let totalNode;

let volume;
let total;

let orderConNameNode;
let orderConAddressNode; 
let orderConPostNode;
let orderConNumNode;
let orderConEmailNode;
let orderConTypeNode;
let orderConDimensionsNode;
let orderConTotalNode;

function setMainListeners() {
    cubeButton.addEventListener('click', function() {selectType('cube.html')});
    cylinderButton.addEventListener('click', function() {selectType('cylinder.html')});
    sphereButton.addEventListener('click', function() {selectType('sphere.html')});
    coneButton.addEventListener('click', function() {selectType('cone.html')});
    
}

function selectType(typePage) {
    type = typePage;
    asyncRequest = new XMLHttpRequest();
	asyncRequest.onreadystatechange = loadProduct;
    asyncRequest.open("GET", typePage, true);
    asyncRequest.send();
}

function loadProduct() {
    if (asyncRequest.readyState == 4 && asyncRequest.status == 200) {
        document.getElementById('productMenu').innerHTML = asyncRequest.responseText;
        getProductElements();
        setProductListeners();
    }   
}

function getProductElements() {
    lengthNode = document.getElementById('length');
    widthNode = document.getElementById('width');
    heightNode = document.getElementById('height');
    radiusNode = document.getElementById('radius');
    radius2Node = document.getElementById('radius2');
    totalNode = document.getElementById('total');
}

function setProductListeners() {
    if (lengthNode) {
        lengthNode.addEventListener('change', printTotal);
        widthNode.addEventListener('change', printTotal);
    }
    if (heightNode) {
        heightNode.addEventListener('change', printTotal);
    }
    if (radiusNode) {
        radiusNode.addEventListener('change', printTotal);
    }
    if (radius2Node) {
        radius2Node.addEventListener('change', printTotal);
    }
    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();
        printOrder();
    });
}

function printTotal() {
    totalNode.textContent = `Total: $${getTotal().toFixed(2)}`;
}

function getTotal() {
    if (lengthNode && widthNode && heightNode) {
        total = 0.001 * getCubeVolume();
    } else if (radiusNode && radius2Node && heightNode) {
        total = 0.002 * getConeVolume();
    } else if (radiusNode && heightNode) {
        total = 0.0012 * getCylinderVolume();
    } else if (radiusNode) {
        total = 0.0015 * getSphereVolume();
    }
    return total;
}

function getVolume() {
    if (lengthNode && widthNode && heightNode) {
        volume = getCubeVolume();
    } else if (radiusNode && radius2Node && heightNode) {
        volume = getConeVolume();
    } else if (radiusNode && heightNode) {
        volume = getCylinderVolume();
    } else if (radiusNode) {
        volume = getSphereVolume();
    }
    return volume;
}

function getCubeVolume() {
    let length = parseFloat(lengthNode.value);
    let width = parseFloat(widthNode.value);
    let height = parseFloat(heightNode.value);
    volume = length * width * height;
    return volume;
}

function getConeVolume() {
    let radius = parseFloat(radiusNode.value);
    let radius2 = parseFloat(radius2Node.value);
    if (radius > radius2) {
        window.alert('The top of a conical planter must be larger than the bottom!');
        radiusNode.value = parseFloat(radius2Node.value - 1);
    }
    let height = parseFloat(heightNode.value);
    volume = (1 / 3) * Math.PI * (radius * radius + radius * radius2 + radius2 * radius2) * height;
    return volume;
}

function getCylinderVolume() {
    let radius = parseFloat(radiusNode.value);
    let height = parseFloat(heightNode.value);
    volume = Math.PI * radius * radius * height;
    return volume;
}

function getSphereVolume() {
    let radius = parseFloat(radiusNode.value);
    volume = 0.5 * ((4 / 3) * Math.PI * radius * radius * radius);
    return volume;
}

function printOrder() {
    submitRequest = new XMLHttpRequest();
	submitRequest.onreadystatechange = loadConfirmation;
    submitRequest.open('GET', 'confirmation.html', true);
    submitRequest.send();
}

function loadConfirmation() {
    if (submitRequest.readyState == 4 && submitRequest.status == 200) {
        document.getElementById('confirmation').innerHTML = submitRequest.responseText;
        getConfirmationElements();
        printConfirmation();
    }
}

function getConfirmationElements() {
    orderConNameNode = document.getElementById('orderConName');
    orderConAddressNode = document.getElementById('orderConAddress');
    orderConPostNode = document.getElementById('orderConPost');
    orderConNumNode = document.getElementById('orderConNum');
    orderConEmailNode = document.getElementById('orderConEmail');
    orderConTypeNode = document.getElementById('orderConType');
    orderConDimensionsNode = document.getElementById('orderConDimensions');
    orderConTotalNode = document.getElementById('orderConTotal');
}

function printConfirmation() {
    orderConNameNode.textContent = `${firstNameNode.value} ${lastNameNode.value}`;
    orderConAddressNode.textContent = addressNode.value;
    orderConPostNode.textContent = postCodeNode.value;
    orderConNumNode.textContent = phoneNode.value;
    orderConEmailNode.textContent = emailNode.value;
    let orderType;
    if (type === 'cube.html') {
        orderType = 'Cubical';
    } else if (type === 'cylinder.html') {
        orderType = 'Cylindrical';
    } else if (type === 'sphere.html') {
        orderType = 'Spherical';
    } else if (type === 'cone.html') {
        orderType = 'Conical';
    }
    orderConTypeNode.textContent = orderType + ' planter';
    orderConDimensionsNode.textContent = `${radiusNode ? radiusNode.value : ''}${widthNode ? widthNode.value + 'x' : ''}${lengthNode ? lengthNode.value : ''}${heightNode ? 'x' + heightNode.value : ''}${radius2Node ? 'x' + radius2Node.value : ''}cm (Volume: ${Math.round(getVolume())} cubic cm)`;
    orderConTotalNode.textContent = `$${getTotal().toFixed(2)}`;
}

setMainListeners();