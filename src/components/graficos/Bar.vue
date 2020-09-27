<script>
import { Bar } from "vue-chartjs";
import ChartJSPluginDatalabels from "chartjs-plugin-datalabels";

export default {
  props: ["pergunta", "label", "total"],
  components: { ChartJSPluginDatalabels },

  extends: Bar,
  data() {
    return {
      chartData: {
        labels: this.label,
        datasets: [
          {
            label: "Total",
            borderWidth: 4,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            pointBorderColor: "#2554FF",
            data: this.total,
          },
        ],
      },
      options: {
        plugins: {
          datalabels: {
            offset: -2,
            color: "black",
            anchor: "end",
            align: "top",
            font: {
              size: 14,
              weight: "bold",
            },
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 18,
            bottom: 0,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  methods: {
    atualizar() {
      this.renderChart(this.chartData, this.options);
    },
  },
  watch: {
    label: {
      deep: true,
      handler() {
        this.chartData.labels = this.label;
        this.chartData.datasets[0].data = this.total;
        this.renderChart(this.chartData, this.options);
      },
    },
  },
};
</script>