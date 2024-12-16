const baseUrl = "http://localhost:3000/";
const studentsUrl = `${baseUrl}students`;
const teacherUrl = `${baseUrl}teachers`;

const get = async (url, id=null) =>{
    if(id){
        url = `${url}/${id}`;
    }
    try{
        const response = await fetch(url);
        if(!response.ok){
            console.log(response.statusText);
            return;
        }
        const data = await response.json();
        return data;
    }catch(e){
        console.log(e);
    }
}

const post = async (url, data) =>{
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if(!response.ok){
            console.log(response.statusText);debugger;
            return;
        }

    }catch(e){
        console.log(e); 
    }
}
const delete_ = async (url, id) => {
    try{
        const response = await fetch(`${url}/${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            }
        });
        if(!response.ok){
            console.log(response.statusText);
            return;
        }
    }catch(e){
        console.log(e);
    }
    await showStudentList();

};

const put = async (url, id, data) =>{
    console.log(url, data, id);debugger;
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
    }catch(error){
        console.log(error);
    }

}

const edit = async (url, id) =>{
    const student_data = await get(url, id);
    sessionStorage.setItem('student_data', JSON.stringify(student_data));
    sessionStorage.setItem('url', url);
    window.location.href = "update-student.html";
};

const showStudentList = async () =>{
    const students = await get(studentsUrl);
    const studentList = document.getElementById("student-list");

    studentList.innerHTML = students.map((student, index)=>{
        return `
            <tr id='${student.id}'>
                <td>${index+1}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td><button class="btn btn-danger " onclick="delete_('${studentsUrl}', '${student.id}')" ><i class="bi bi-trash"></i></button></td>
                <td><button class="btn btn-warning" onclick="edit('${studentsUrl}', '${student.id}')" ><i class="bi bi-pencil"></i></button></td>
            </tr>`;
        })
    
};

const addStudent = document.getElementById("add-student");
addStudent.addEventListener('click', async ()=>{
    const name = document.getElementById('student-name').value;
    const email = document.getElementById('student-email').value;
    
    const data = { name, email };
    await post(studentsUrl, data);

    document.getElementById('student-name').value = '';
    document.getElementById('student-email').value = '';
});

showStudentList();

// edit student


