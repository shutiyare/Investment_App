import { Column } from '@ant-design/plots';

function BarChart() {
    const data = [
        {
          type: 'January',
          sales: 38,
        },
        {
          type: 'February',
          sales: 52,
        },
        {
          type: 'March',
          sales: 61,
        },
        {
          type: 'April',
          sales: 33,
        },
        {
          type: 'May',
          sales: 88,
        },
        {
          type: 'june',
          sales: 19,
        },
        {
          type: 'July',
          sales: 38,
        },
        {
          type: 'August',
          sales: 64,
        },
        {
          type: 'September',
          sales: 70,
        },
        {
          type: 'October',
          sales: 22,
        },
        {
          type: 'November',
          sales: 55,
        },
        {
          type: 'December',
          sales: 48,
        },
      ];
      const config = {
        data,
        xField: 'type',
        yField: 'sales',
        label: {
          // 可手动配置 label 数据标签位置
          position: 'middle',
          // 'top', 'bottom', 'middle',
          // 配置样式
          style: {
            fill: '#FFFFFF',
            opacity: 0.6,
          },
        },
        xAxis: {
          label: {
            autoHide: true,
            autoRotate: false,
          },
        },
        meta: {
          type: {
            alias: 'Month',
          },
          sales: {
            alias: 'Clients',
          },
        },
      };
      return <Column {...config} />;
}

export default BarChart