import Employee from "../models/employee.models.js"

//CREATE
export const createEmployee = async(req,res)=>{
    const employee = await Employee.create(req.body);
    res.status(201).json({msg:"Employee created Successfully",employee})
}

//READ ALL
export const getEmployee =async(req,res)=>{
    const employees= await Employee.find();
    res.status(200).json(employees);
}

//READ ONE
export const getEmployeeById =async(req,res)=>{
    const employee=await Employee.findById(req.params.id);
    if(!employee){
        res.status(404).json({msg: "Employee not found"});
    }
    res.status(200).json({msg:"Employee fetched Successfully",employee});
}
//Read by name
export const getEmployeeByname = async (req, res) => {
    try {
        const name = (req.params.name || '').trim();

        const employee = await Employee.find({
            userName: { $regex: name, $options: 'i' }
        });

        return res.status(200).json({
            msg: 'Employee fetched Successfully',
            employee
        });

    } catch (err) {
        console.error('getEmployeeByname error:', err);
        return res.status(500).json({ msg: 'Server error' });
    }
};

//UPDATE
export const updateEmployee=async(req,res)=>{
    const employee=await Employee.findByIdAndUpdate(req.params.id,req.body,{new: true});
    if(!employee){
        res.status(404).json({msg: "Employee not found"});
    }
    res.status(200).json({msg:"Employee Updated Successfully",employee});
}

//DELETE
export const deleteEmployee =async(req,res)=>{
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if(!employee){
        res.status(404).json({msg: "Employee not found"});
    }
    res.status(200).json({msg:"Employee Deleted Successfully"});
}