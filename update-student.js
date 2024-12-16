
const put = async (url, id, data) =>{
    try{
        const response = await fetch(`${url}/${id}`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if(!response.ok) {
            console.log(response.statusText); 
            return;
        }
        console.log(response.statusText); 
    }catch(error){
        console.log(error); 
    }

}


const updateStudent = document.getElementById("update-student");
updateStudent.addEventListener('click', async ()=>{
    let name = document.getElementById("student-name-update").value;
    let email = document.getElementById("student-email-update").value;

    const preData = JSON.parse(sessionStorage.getItem('student_data'));
    const url = sessionStorage.getItem('url');

    if (!name) name = preData.name;
    if(!email) email = preData.email;

    const data = { name, email };
    const id = preData.id;

    await put(url, id, data);

    sessionStorage.removeItem('student_data');
    sessionStorage.removeItem('url');    
});