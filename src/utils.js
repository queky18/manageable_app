const utils = {
    weightedAverage: (members, totalValuePoints) => {
        let sum = 0;
        
        for (let i = 0; i < members.length; i++) {
            sum += (members[i].valuePoints * members[i].vote);
        }

        return sum / totalValuePoints;
    }
}

export default utils;