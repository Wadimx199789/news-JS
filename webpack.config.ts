import path from 'node:path';
import type { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import DotenvWebpackPlugin from 'dotenv-webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import devConfig from './webpack.dev.config.ts';
import prodConfig from './webpack.prod.config.ts';

interface Env {
    mode?: 'dev' | 'prod';
}

const baseConfig: Configuration = {
    entry: path.resolve(import.meta.dirname, './src/index.ts'),
    module: {
        rules: [
            {
                test: /\.ts$/i,
                loader: 'ts-loader',
                options: { transpileOnly: true },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(import.meta.dirname, './dist'),
        clean: true,
    },
    plugins: [
        new DotenvWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(import.meta.dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new ForkTsCheckerWebpackPlugin(),
    ],
};

export default ({ mode }: Env): Configuration => {
    const envConfig = mode === 'prod' ? prodConfig : devConfig;

    return merge(baseConfig, envConfig);
};
