import { useCallList1Query } from "../../features/api/buttonapi"
const Dashboard = () => {
    const { data } = useCallList1Query()
    return (
        <div>
            dashboard
            <p>Data: {data}</p>
        </div>
    )
}

export default Dashboard