import React from 'react';
import CustomerData from '../../data';


const Table = (props) =>{
    const tableHData = ["Customer Id","Custmer Name", "Bill Amount", "Date", "Points Rewarded"];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
 

        const pointsPerSale = CustomerData.map(sale => {
            let points = 0;
            let over100 = sale.billAmount - 100;
            let less100 = sale.billAmount -50;
    
            if(over100 > 0){
                points += (over100 * 2 + 50);
            }
            else if(less100 > 0){
                points += (less100 *1);
            }
            const month = new Date(sale.billDt).getMonth();
           
            return { ...sale, points, month}
        });

        let byCustomer = {};
        console.log(byCustomer);
        let totalPointsByCustomer = {};

        pointsPerSale.forEach(pointsPerSale=>{
            let {custId, custName, month, points} = pointsPerSale;
            if(!byCustomer[custId]){
                byCustomer[custId] = [];
            }
            if (!totalPointsByCustomer[custId]) {
                totalPointsByCustomer[custName] = 0;
            }
            totalPointsByCustomer[custName] += points;
            if (byCustomer[custId][custName]) {
                byCustomer[custId][custName].points += points;
                byCustomer[custId][custName].monthNumber = month;
                byCustomer[custId][custName].numTransactions++;
            }
            else {

                byCustomer[custId][month] = {
                    custId,
                    custName,
                    monthNumber: month,
                    month: months[month],
                    numTransactions: 1,
                    points
                }
            }
        });
    let tot = [];
    for (var custKey in byCustomer) {
        byCustomer[custKey].forEach(cRow => {
            tot.push(cRow);
        });
    }
  console.log("byCustomer", byCustomer);
  console.log("tot", tot);
        
    return(
        <div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        {tableHData.map((t,index) => <th key={index} scope="col">{t}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {pointsPerSale.map((customer, index)=>{
                        return (
                            <tr key={index}>
                                <th scope="row">{customer.custId}</th>
                                <td>{customer.custName}</td>
                                <td>{customer.billAmount}</td>
                                <td>{customer.month}</td>
                                <td>{customer.points}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}
export default Table;