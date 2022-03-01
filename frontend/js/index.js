
const d = document;
const $formKoder = d.getElementById('formKoder').content,
      $formMentor = d.getElementById('formMentor').content,
      $form = d.getElementById('sectionForm'),
      $table = d.getElementById('table'),
      $tableKoder = d.getElementById('table-koder').content;
      $tableMentors = d.getElementById('table-mentors').content;
      
      
      

      const getMentors = async ()=>{
        try {
            let $tbody = $tableMentors.querySelector('tbody');
            let res = await fetch('http://localhost:8080/mentors');
            let json = await res.json();
    
            if(!res.ok) throw {status: res.status, statusText: res.statusText};
            while($table.hasChildNodes()){
                $table.removeChild($table.lastChild)
            }
            let mentors = json.data.mentors;
            
            let $fragmenttwo = d.createDocumentFragment(),
                $thead = $tableMentors.querySelector('thead'),
                $clone = d.importNode($thead, true);
                $fragmenttwo.appendChild($clone);
            $table.appendChild($fragmenttwo);
    
            let $fragment = d.createDocumentFragment()
            mentors.forEach(el => {
                
                $tbody.querySelector('.name').textContent = el.name;
                $tbody.querySelector('.module').textContent = el.module;
                $tbody.querySelector('.gender').textContent = el.gender;
                $tbody.querySelector('.edit-m').dataset.id = el._id;
                $tbody.querySelector('.delete-m').dataset.id = el._id;
                let $clone = d.importNode($tbody, true);
                $fragment.appendChild($clone)
            });
            $table.appendChild($fragment);
        } catch (err) {
            console.log(err);
        }
    }     
      
const getKoders = async ()=>{
    try {
        let $tbody = $tableKoder.querySelector('tbody');
        let res = await fetch('http://localhost:8080/koders');
        let json = await res.json();

        if(!res.ok) throw {status: res.status, statusText: res.statusText};
        while($table.hasChildNodes()){
            $table.removeChild($table.lastChild)
        }
        let koder = json.data.koders;
        let $fragmenttwo = d.createDocumentFragment(),
            $thead = $tableKoder.querySelector('thead'),
            $clone = d.importNode($thead, true);
            $fragmenttwo.appendChild($clone);
        $table.appendChild($fragmenttwo);

        let $fragment = d.createDocumentFragment()
        koder.forEach(el => {
            $tbody.querySelector('.name').textContent = el.name;
            $tbody.querySelector('.lastName').textContent = el.lastname;
            $tbody.querySelector('.age').textContent = el.age;
            $tbody.querySelector('.gender').textContent = el.gender;
            $tbody.querySelector('.edit-k').dataset.id = el._id;
            $tbody.querySelector('.delete-k').dataset.id = el._id;
            let $clone = d.importNode($tbody, true);
            $fragment.appendChild($clone)
        });
        $table.appendChild($fragment);
    } catch (err) {
        console.log(err);
    }
}
const deleteKoder = async (id) => {
    try {
        
        let res = await fetch(`http://localhost:8080/koders/${id}`,{method: "DELETE"});
        if(!res.ok) throw {status: res.status, statusText: res.statusText};

        await getKoders();
    } catch (error) {
        console.log( error );
    }
}
const deleteMentor = async (id) => {
    try {
        
        let res = await fetch(`http://localhost:8080/mentors/${id}`,{method: "DELETE"});
        if(!res.ok) throw {status: res.status, statusText: res.statusText};

        await getMentors();
    } catch (error) {
        console.log( error );
    }
}
const getKoderId = async (id)=>{
    try {
        let $name = d.getElementById('nombre');
        let $lastName = d.getElementById('lastName');
        let $age = d.getElementById('age');
        let $gender = d.getElementById('gender');

        let res = await fetch(`http://localhost:8080/koders/${id}`)
        let json = await res.json();
        let koders = json.data.koders;
        $name.value = koders.name;
        $lastName.value = koders.lastname;
        $age.value = koders.age;
        $gender.value = koders.gender;

    } catch (error) {
        console.log(error);
    }
}
const getMentorId = async (id)=>{
    try {
        let $name = d.getElementById('name');
        let $module = d.getElementById('module');
        let $gender = d.getElementById('gender');

        let res = await fetch(`http://localhost:8080/mentors/${id}`)
        let json = await res.json();
        let mentors = json.data.mentor;
        $name.value = mentors.name;
        $module.value = mentors.module;
        
        $gender.value = mentors.gender;

    } catch (error) {
        console.log(error);
    }
}
const patchKoders = async (id)=>{
    try {
        let $name = d.getElementById('nombre');
        let $lastName = d.getElementById('lastName');
        let $age = d.getElementById('age');
        let $gender = d.getElementById('gender');
        let data = {
            name: $name.value,
            lastname: $lastName.value,
            age: $age.value,
            gender: $gender.value
    }
    
    let options = {
        method: "PATCH",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data),
        
    }

    let res = await fetch(`http://localhost:8080/koders/${id}`, options);
    if(!res.ok) throw {status: res.status, statusText: res.statusText};
        $name.value = ""
        $age.value= ""
        $gender.value = ""
        $lastName.value = ""
        await getKoders();
    } catch (error) {
        console.log(error);
    }
    


}
const patchMentor = async (id)=>{
    try {
        let $name = d.getElementById('name');
        let $module = d.getElementById('module');
        let $gender = d.getElementById('gender');

        let data = {
            name: $name.value,
            module: $module.value,
            gender: $gender.value
    }
    
    let options = {
        method: "PATCH",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data),
        
    }

    let res = await fetch(`http://localhost:8080/mentors/${id}`, options);
    if(!res.ok) throw {status: res.status, statusText: res.statusText};
    $name.value = ""
    $gender.value = ""
    $module.value = ""
        await getMentors();
    } catch (error) {
        console.log(error);
    }
    


}
const postMentors = async () =>{
    try {
        
        let $name = d.getElementById('name');
        let $module = d.getElementById('module');
        let $gender = d.getElementById('gender');
        
        let data = {
                name: $name.value,
                module: $module.value,
                gender: $gender.value
        }
       
        let options = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
            
        }
        let res = await fetch('http://localhost:8080/mentors',options);
        
        if(!res.ok) throw {status: res.status,  message: res.message};
       
        $name.value = ""
        $gender.value = ""
        $module.value = ""
        await getMentors();
    } catch (error) {
        let message = error.statusText || "Ocurrió un error";
            $form.insertAdjacentHTML("afterend", `<p><b>Error ${error.status}: ${message}</b></p>`)
    }
}  
const postKoders = async () =>{
    try {
        let $name = d.getElementById('nombre');
        let $lastName = d.getElementById('lastName');
        let $age = d.getElementById('age');
        let $gender = d.getElementById('gender');
        
        let data = {
                name: $name.value,
                lastname: $lastName.value,
                age: $age.value,
                gender: $gender.value
        }
       
        let options = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
            
        }
        let res = await fetch('http://localhost:8080/koders',options);
        
        if(!res.ok) throw {status: res.status,  message: res.message};
       
        $name.value = ""
        $age.value= ""
        $gender.value = ""
        $lastName.value = ""
        await getKoders();
    } catch (error) {
        let message = error.statusText || "Ocurrió un error";
            $form.insertAdjacentHTML("afterend", `<p><b>Error ${error.status}: ${message}</b></p>`)
    }
}
      d.addEventListener('click', (e) =>{
          if(e.target.matches('#btnK')){
              while ($form.hasChildNodes()) {
                      $form.removeChild($form.lastChild)
                  }
                  let $clone = d.importNode($formKoder, true),
                  $fragment = d.createDocumentFragment();
                  
        $fragment.appendChild($clone);
        
        $form.appendChild($fragment);
        
        getKoders()
        
    }
    if(e.target.matches('#btnM')){
        
        while ($form.hasChildNodes()) {
            $form.removeChild($form.lastChild)
        }
        let $clone = d.importNode($formMentor, true),
        $fragment = d.createDocumentFragment();

        $fragment.appendChild($clone);

        $form.appendChild($fragment);

        getMentors();
    }
    if (e.target.matches('#btn-Agregar-k')) {
        e.preventDefault();
        

        postKoders();
        
    }
    if (e.target.matches('#btn-Agregar-m')) {
        e.preventDefault();
        
        postMentors();
        
        
    }
    if(e.target.matches('.delete-k')){
        let id = e.target.dataset.id;
        
        let isdelete = confirm(`¿Estás seguro de eliminar el id ${e.target.dataset.id}?`);

        if (isdelete) {
            deleteKoder(id)
        }
    }
    if(e.target.matches('.delete-m')){
        let id = e.target.dataset.id;
        
        let isdelete = confirm(`¿Estás seguro de eliminar el id ${e.target.dataset.id}?`);

        if (isdelete) {
            deleteMentor(id)
        }
    }
    if(e.target.matches('.edit-k')){
        
        let id = e.target.dataset.id;
        let $btnModificar = d.getElementById('btn-Modificar-k');
        let $btnAgregar = d.getElementById('btn-Agregar-k');

        $btnModificar.removeAttribute('disabled');
        $btnAgregar.setAttribute('disabled', true);
        $btnModificar.dataset.id = id;
        getKoderId(id);

    }
    if (e.target.matches('#btn-Modificar-k')) {
        let id = e.target.dataset.id;
        let $btnModificar = d.getElementById('btn-Modificar-k');
        let $btnAgregar = d.getElementById('btn-Agregar-k');
        e.preventDefault();
        $btnModificar.setAttribute('disable', true)
        $btnAgregar.removeAttribute('disabled');
        patchKoders(id)
    }
    if(e.target.matches('.edit-m')){
        
        let id = e.target.dataset.id;
        let $btnModificar = d.getElementById('btn-Modificar-m');
        let $btnAgregar = d.getElementById('btn-Agregar-m');

        $btnModificar.removeAttribute('disabled');
        $btnAgregar.setAttribute('disabled', true);
        $btnModificar.dataset.id = id;
        getMentorId(id);

    }
    if (e.target.matches('#btn-Modificar-m')) {
        let id = e.target.dataset.id;
        let $btnModificar = d.getElementById('btn-Modificar-m');
        let $btnAgregar = d.getElementById('btn-Agregar-m');
        e.preventDefault();
        $btnModificar.setAttribute('disable', true)
        $btnAgregar.removeAttribute('disabled');
        patchMentor(id)
    }
});

