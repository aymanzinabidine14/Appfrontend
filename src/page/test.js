
function UpdateSandage() {


  return(
    
    
    
    
    <main id="main" class="main">

    <div class="pagetitle">
      <h1>General Tables</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item">Tables</li>
          <li class="breadcrumb-item active">General</li>
        </ol>
      </nav>
    </div>

    <section class="section">
      <div class="row">
        <div class="col-lg-6">

          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Create group poll</h5>

              <form class="row g-3">
               
                <div class="col-12">
                  <label for="inputNanme4" class="form-label">Title</label>
                  <input type="text" class="form-control" id="inputNanme4"></input>
                </div>
                
                <div class="col-12">
                  <label for="inputEmail4" class="form-label">Description</label>
                  <textarea class="form-control" placeholder="Address" id="floatingTextarea"></textarea>
                </div>
                
              </form>
           
            </div>
          </div>

         

        </div>

        <div class="col-lg-6">

          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Table with stripped rows</h5>

              <form class="row g-3">

                <div class="col-md-12">
                <div className="btn-group mb-3" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name="btnradio" id="btnradio1" value="15"/>
                        <label className="btn btn-outline-primary" htmlFor="btnradio1">15 min</label>

                        <input type="radio" className="btn-check" name="btnradio" id="btnradio2" value="30"  />
                        <label className="btn btn-outline-primary" htmlFor="btnradio1">15 min</label>

                        <input type="radio" className="btn-check" name="btnradio" id="btnradio3" value="60" />
                        <label className="btn btn-outline-primary" htmlFor="btnradio1">15 min</label>
                    </div>
                </div>

                <div class="col-md-6">
                    <input type="date" class="form-control" placeholder="Your Email"></input>
                </div>

                <div class="col-md-6">
                    <input type="time" class="form-control" id="floatingPassword" placeholder="Password"></input>
                </div>
               
              
                <div class="text-center">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>

             
            </div>
          </div>

          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Table with stripped rows</h5>

              <table class="table">
  <thead>
    <tr>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
   
  </tbody>
</table>

             
            </div>
          </div>

       

        </div>
      </div>
    </section>

  </main>

    )
}
export default UpdateSandage;





