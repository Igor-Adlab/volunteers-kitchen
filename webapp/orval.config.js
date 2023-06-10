module.exports = {
    'automatr-api': {
        output: {
            mode: 'tags-split',
            client: 'react-query',
            schemas: 'src/@generated/schemas',
            target: 'src/@generated/generated.ts',
            override: {
                mutator: {
                    name: 'api',
                    path: 'src/axios.ts',
                },
            },
        },
        input: './docs/open-api.yaml',
    },
};
