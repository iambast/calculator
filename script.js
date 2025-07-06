class Calculator{
    constructor(previousoperandtextbutton,currentoperandtextbutton)
    {
        this.currentoperandtextbutton=currentoperandtextbutton;
        this.previousoperandtextbutton=previousoperandtextbutton;
        this.clear();
    }


    clear(){
        this.currentoperand='';
        this.previousoperand='';
        this.operation=undefined;

    }

    delete(){
        this.currentoperand=this.currentoperand.toString().slice(0,-1)

    }

    appendnumber(number){
        if(number==='.' && this.currentoperand.includes('.'))return
        this.currentoperand=this.currentoperand.toString() +number.toString()

    }

    chooseoperation(operation){
        if(this.currentoperand==='') return
        if(this.previousoperand!=='')
        {
            this.compute()
        }
        this.operation=operation
        this.previousoperand=this.currentoperand
        this.currentoperand='' 

    }

    compute(){
        let computation
        const prev=parseFloat(this.previousoperand)
        const current=parseFloat(this.currentoperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation)
        {
            case '+':computation=prev+current;
            break;
            case '-':computation=prev-current;
            break;
            case '*':computation=prev*current;
            break;
            case '/':computation=prev/current;
            break;
            default:return

        }
        this.currentoperand=computation
        this.operation=undefined
        this.previousoperand=''

    }

    //for comma
    getdisplatnumber(number)
    {
        const stringnumber=number.toString()
        const integerdigit=parseFloat(stringnumber.split('.')[0])
        const decimaldigit=(stringnumber.split('.')[1])
        let integerdisplay
        if(isNaN(integerdigit)) integerdisplay=''
        else integerdisplay=integerdigit.toLocaleString('en',{maximumFractionDigits:0})
        if(decimaldigit!=null)
        {
            return `${integerdisplay}.${decimaldigit}`
        }
        else return integerdisplay   
    }

    updatedisplay(){
        this.currentoperandtextbutton.innerText =this.getdisplatnumber(this.currentoperand);
        if(this.operation!=null)
        {
        this.previousoperandtextbutton.innerText =`${this.getdisplatnumber(this.previousoperand)} ${this.operation}`; 
        }
        else
        {
            this.previousoperandtextbutton.innerText=''
        }

    }



}const numberbuttons=document.querySelectorAll('[data-number]')
const operationbuttons=document.querySelectorAll('[data-operation]')
const equalsbutton=document.querySelector('[data-equals]')
const deletebutton=document.querySelector('[data-delete]')
const acbutton=document.querySelector('[data-ac]')
const previousoperandtextbutton=document.querySelector('[data-previous-operand]')
const currentoperandtextbutton=document.querySelector('[data-current-operand]')

const calculator=new Calculator(previousoperandtextbutton,currentoperandtextbutton);

numberbuttons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.appendnumber(button.innerText)
        calculator.updatedisplay()
    })
})

operationbuttons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.chooseoperation(button.innerText)
        calculator.updatedisplay()
    })
})

equalsbutton.addEventListener('click',button=>{
    calculator.compute(),
    calculator.updatedisplay()
})

acbutton.addEventListener('click',button=>{
    calculator.clear(),
    calculator.updatedisplay()
})

deletebutton.addEventListener('click',button=>{
    calculator.delete()
    calculator.updatedisplay()
})