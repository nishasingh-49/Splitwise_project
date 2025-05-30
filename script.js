import { BinaryHeap } from './heap.js';

onload = function () {
    let curr_data;
    const container = document.getElementById('mynetwork');
    const container2 = document.getElementById('mynetwork2');
    const genNew = document.getElementById('generate-graph');
    const solve = document.getElementById('solve');
    const temptext = document.getElementById('temptext');
    const inputForm = document.getElementById('input-form');
    const addTransaction = document.getElementById('add-transaction');
    const transactionList = document.getElementById('transaction-list');

    const options = {
        edges: {
            arrows: { to: true },
            labelHighlightBold: true,
            font: { size: 20 }
        },
        nodes: {
            font: '12px arial red',
            scaling: { label: true },
            shape: 'icon',
            icon: { face: 'FontAwesome', code: '\uf183', size: 50, color: '#991133' }
        }
    };

    let network = new vis.Network(container);
    network.setOptions(options);
    let network2 = new vis.Network(container2);
    network2.setOptions(options);

    let transactions = [];

    addTransaction.onclick = function () {
        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;
        const amount = document.getElementById('amount').value;

        if (from && to && amount && from !== to) {
            transactions.push({ from: parseInt(from), to: parseInt(to), label: amount });
            const li = document.createElement('li');
            li.innerText = `Person ${from} → Person ${to}: ₹${amount}`;
            transactionList.appendChild(li);
        }
    };

    genNew.onclick = function () {
        const sz = Math.max(...transactions.map(t => Math.max(t.from, t.to)), 2);
        let nodes = [];
        for (let i = 1; i <= sz; i++) {
            nodes.push({ id: i, label: "Person " + i });
        }
        nodes = new vis.DataSet(nodes);

        const data = { nodes: nodes, edges: transactions };
        curr_data = data;
        network.setData(data);
        temptext.style.display = "inline";
        container2.style.display = "none";
    };

    solve.onclick = function () {
        temptext.style.display = "none";
        container2.style.display = "inline";
        const solvedData = solveData();
        network2.setData(solvedData);
    };

    function solveData() {
        let data = curr_data;
        const sz = data['nodes'].length;
        const vals = Array(sz).fill(0);

        for (let i = 0; i < data['edges'].length; i++) {
            const edge = data['edges'][i];
            vals[edge['to'] - 1] += parseInt(edge['label']);
            vals[edge['from'] - 1] -= parseInt(edge['label']);
        }

        const pos_heap = new BinaryHeap();
        const neg_heap = new BinaryHeap();

        for (let i = 0; i < sz; i++) {
            if (vals[i] > 0) pos_heap.insert([vals[i], i]);
            else if (vals[i] < 0) {
                neg_heap.insert([-vals[i], i]);
                vals[i] *= -1;
            }
        }

        const new_edges = [];
        while (!pos_heap.empty() && !neg_heap.empty()) {
            const mx = pos_heap.extractMax();
            const mn = neg_heap.extractMax();

            const amt = Math.min(mx[0], mn[0]);
            const to = mx[1];
            const from = mn[1];

            new_edges.push({ from: from + 1, to: to + 1, label: String(amt) });
            vals[to] -= amt;
            vals[from] -= amt;

            if (mx[0] > mn[0]) pos_heap.insert([vals[to], to]);
            else if (mx[0] < mn[0]) neg_heap.insert([vals[from], from]);
        }

        data = { nodes: data['nodes'], edges: new_edges };
        return data;
    }
};
